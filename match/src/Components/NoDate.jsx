import React from 'react';
import '../NoDate.css'; 

const NoDate = () => {
  return (
    <div className="no-date-container">
        <div className="no-date-message">
      <h1>No Match Found Yet!  </h1>
      </div>
      <div className="no-date-description">
      <p>Don't worry, your perfect match might be just around the corner.</p>
      <p>Your perfect match is getting ready for your special meeting.</p>
      </div>
        
    </div>
  );
};

export default NoDate;
