import { useState } from 'react';
import './ValentinesForm.css'; // Import your CSS file for styling

const ValentinesForm = () => {
  const [formData, setFormData] = useState({
    name: '',
   instagramId: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
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
    <input type="radio" id="male" name="gender" value="male" />
    <label htmlFor="male">Male</label>

    <input type="radio" id="female" name="gender" value="female" />
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
