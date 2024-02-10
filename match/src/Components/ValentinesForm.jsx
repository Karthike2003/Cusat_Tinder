import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs} from 'firebase/firestore';
import { app,messaging} from '../firebaseConfig';
import {getToken} from 'firebase/messaging';
import { onMessage} from 'firebase/messaging';
import {  updateDoc } from 'firebase/firestore';
import NoDate from './NoDate';


const db = getFirestore(app);

const ValentinesForm = ({onMatchFound, setMatchDetails}) => {
    const [docset, setDocset] = useState([{}]);
  
  
    
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    instagramId: '',
    matched: false,
  });

  const [matches, setMatches] = useState([]);
  let match;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    if(!array[randomIndex].matched){
      return array[randomIndex];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isInstagramIdTaken = await checkInstagramIdExists(formData.instagramId);

    if (isInstagramIdTaken) {
      window.alert('OOPS only one chance!');
      return;
    }

    try {
      
      const docRef = await addDoc(collection(db, 'matchdata'), formData);
      console.log('Document written with ID: ', docRef.id);
    localStorage.setItem('formData', JSON.stringify(formData));
      window.alert('Let\'s see who your date is!✌️');
      window.location.reload();

      // No need to call matchAlgorithm here; useEffect will handle it
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const checkInstagramIdExists = async (instagramId) => {
    try {
      const q = query(collection(db, 'matchdata'), where('instagramId', '==', instagramId));
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking Instagram ID: ', error);
      return true;
    }
  };

  const updateMatchedFlag = async (documentId) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'matchdata'), where('instagramId', '==', documentId)));
    
      if (querySnapshot.size > 0) {
        await Promise.all(querySnapshot.docs.map(async (doc) => {
          
          await updateDoc(doc.ref, { matched: true });
        }));
       
      } else {//console.log("no document found");
        
      }
    } catch (error) {
      console.error('Error updating matched flag: ', error);
    }
  };
  
  

  const storedData = localStorage.getItem('formData');
  useEffect(() => {
  
    
   

    const matchAlgorithm = async () => {
      try {
        const q = query(collection(db, 'matchdata'));
        const querySnapshot = await getDocs(q);
  
        const girls = [];
        const boys = [];
        const matchedBoys = [];
        const matchedGirls = [];
  
        querySnapshot.forEach((doc) => {
          const profileData = doc.data();
          if (profileData.gender === 'male' && !profileData.matched) {
            boys.push(profileData);
          } else if (profileData.gender === 'female' && !profileData.matched) {
            girls.push(profileData);
          }
        });
  
        const matchedProfiles = [];
  
        girls.forEach((girl) => {
          const randomBoy = getRandomElement(boys);
  
          if (girl.name && randomBoy && randomBoy.name && !girl.matched && !randomBoy.matched && !matchedBoys.includes(randomBoy.instagramId) && !matchedGirls.includes(randomBoy.instagramId)){
            const match = {
              girl: girl,
              boy: randomBoy,
            };
  
            updateMatchedFlag(match.girl.instagramId);
            updateMatchedFlag(match.boy.instagramId);
  
            onMatchFound();
            setMatchDetails(match);
           
            matchedProfiles.push(match);
            matchedBoys.push(randomBoy.instagramId);
            matchedGirls.push(girl.instagramId)
          }
        });
  
        setMatches((prevMatches) => [...prevMatches, ...matchedProfiles]);
  
        // Console log the names of matched pairs
        matchedProfiles.forEach((pair) => {
          console.log(`Matched Pair: ${pair.girl.name} and ${pair.boy.name}`);
        });
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };
   

    
    
    matchAlgorithm();
   
    const unsubscribe = onMessage(messaging, (payload) => {

  });


  return () => unsubscribe();
  }, []);


  return (
   <>
   
    {storedData ? 
    (<NoDate/> ): 
   
    ( <div className="valentines-form-container">
      <h2>Find Your Date 🧑‍❤️‍👩</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div>
          <label>Gender</label>
          <div className='gender'>
            <label htmlFor="male">Romeo</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleChange}
            />
           
           <label htmlFor="female">Juliet</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChange}
            />
          </div>

          <label htmlFor="instagramId">Instagram ID:</label>
          <input
            type="text"
            id="instagramId"
            name="instagramId"
            value={formData.instagramId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Send Love</button>
      </form>
    </div>
    )}
    </>
  );
};

export default ValentinesForm;
