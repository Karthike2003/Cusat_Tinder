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
            <div className='insta'>
          <p className="romantic-message">
            {matchDetails.girl
              ? `💖 Your date: ${matchDetails.boy.name}  (instagramid:${matchDetails.boy.instagramId})`
              : `💖 Your date: ${matchDetails.girl.name}(instagramid: ${matchDetails.girl.instagramId})`}
          </p>
              {/* <FiInstagram/> */}
          </div>
        )}
      </div>
    </div>
    
  );
};

export default MyDate;
