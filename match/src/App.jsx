import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { app } from './firebaseConfig';

const db = getFirestore(app);

const ValentinesForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    instagramId: '',
  });

  const [matches, setMatches] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
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
      window.alert('Let\'s see who your date is!');

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

  useEffect(() => {
    const matchAlgorithm = async () => {
      try {
        const q = query(collection(db, 'matchdata'));
        const querySnapshot = await getDocs(q);
    
        const girls = [];
        const boys = [];
    
        querySnapshot.forEach((doc) => {
          const profileData = doc.data();
          if (profileData.gender === 'male') {
            boys.push(profileData);
          } else if (profileData.gender === 'female') {
            girls.push(profileData);
          }
        });
    
        const matchedProfiles = [];
    
        girls.forEach((girl) => {
          const randomBoy = getRandomElement(boys);
    
          const match = {
            girl: girl,
            boy: randomBoy,
          };
    
          matchedProfiles.push(match);
    
          boys.splice(boys.indexOf(randomBoy), 1);
        });
    
        // Set the state with the matched profiles
        setMatches(matchedProfiles);
    
        // Console log the names of matched pairs
        matchedProfiles.forEach((pair) => {
          console.log(`Matched Pair: ${pair.girl.name} and ${pair.boy.name}`);
        });
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };
    

    // Call matchAlgorithm when formData changes
    matchAlgorithm();
  }, []);

  return (
    <div className="valentines-form-container">
      <h2>Spread the Love! 💖</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div>
          <label>Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
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
  );
};

export default ValentinesForm;
