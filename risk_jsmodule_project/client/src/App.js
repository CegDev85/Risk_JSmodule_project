import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import WelcomeContainer from './containers/WelcomeContainer';
import LeaderboardContainer from './containers/LeaderboardContainer';
import NavBar from './components/NavBar';
import MapContainer from './containers/MapContainer';

const App = () => {

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(["player1", "player2"])},[])

  return(
    <div className="App">
      
      <Router>
        <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={WelcomeContainer} />
          <Route path="/leaderboard" component={LeaderboardContainer} />
        </Switch>
        </>
      </Router>
      <MapContainer players={players}/>
    
    </div>
    
  );
}

export default App;
