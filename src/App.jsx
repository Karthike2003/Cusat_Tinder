import React,{useState,useCallback} from 'react';
import { Analytics } from '@vercel/analytics/react';

import ValentinesForm from './Components/ValentinesForm';

import MyDate from './Components/MyDate';
//hai
const App = () => {
  const [matchFound, setMatchFound] = useState(false);
  const [matchDetails, setMatchDetails] = useState({});



  const handleMatchFound = useCallback(() => {
    setMatchFound(true);
   
    console.log("match found!showing mydate page");
  }, []);
  

  return (
    <div>
      <Analytics />
      {matchFound ? (
        <MyDate  matchDetails={matchDetails}/>
      ) : (
        <ValentinesForm onMatchFound={handleMatchFound} setMatchDetails={setMatchDetails} />
      )}
    </div>
  );
};

export default App;
