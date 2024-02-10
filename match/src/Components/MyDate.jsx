import React from 'react';
import '../MyDate.css'; 

const MyDate = ({ matchDetails }) => {
  return (
    <div className="my-date-container">
      <h1>Your Love Story Unfolds</h1>
      <p>Congratulations on finding your perfect match!</p>
      <div className="partner-details">
        <h2>Meet Your Special Someone</h2>
        {matchDetails && (
          <p className="romantic-message">
            {matchDetails.girl
              ? `💖 Get ready for a magical evening with the charming ${matchDetails.boy.name}. 💖`
              : `💖 Get ready for a magical evening with the charming ${matchDetails.girl.name}. 💖`}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyDate;
