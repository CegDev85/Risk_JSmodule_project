import './App.css';
import MapContainer from './containers/MapContainer';
import React, {useState, useEffect} from 'react';

const App = () => {

  const [players, setPlayers] = useState([]);

  // useEffect(() => {
  //   setPlayers[{
  //     "name": 'Player_one',
  //     "colour": '#61dafb'
  //   }, 
  //   {
  //     "name": 'Player Two',
  //     "colour": "#000000"
  //   }]
  // },[])

  return(
    <div className="App">
      <MapContainer players={players}/>
    </div>
  )
}

export default App;
