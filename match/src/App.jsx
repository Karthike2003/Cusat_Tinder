import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';

// Assuming you have initialized your Firebase app appropriately

const db = getFirestore(app);

const ValentinesForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '', // Add gender to your formData
    instagramId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new document with a generated id to the "valentines" collection
      const docRef = await addDoc(collection(db, 'matchdata'), formData);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

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
