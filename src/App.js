import React, { useState, useEffect } from 'react';
import './App.css';
import Wheel from './components/Wheel/Wheel';

function App() {
  const [params, setParams] = useState({})

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    
    setParams({...params, 
      guid: urlParams.get('guid'),
      username: urlParams.get('username'),
      randomChosenPackage: urlParams.get('RandomChosenPackage')
    })
  }, [])

  //TO DO: Handle audio here

  return (
    <div className="App">
      <Wheel params={params}/>
    </div>
  );
}

export default App;
