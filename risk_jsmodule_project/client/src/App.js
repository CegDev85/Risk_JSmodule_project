import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import WelcomeContainer from './containers/WelcomeContainer';
import LeaderboardContainer from './containers/LeaderboardContainer';
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid'



import MapContainer from './containers/MapContainer';


const App = () => {

  const [players, setPlayers] = useState([]);

  // useEffect(() => {
  //   setPlayers(["player1", "player2"])},[])



  const addPlayers = (playersToAdd) => {
    setPlayers(playersToAdd)
    }


  return(
    <div className="App">

      <Router>
        <>
        <NavBar />
        <Switch>
          <Route exact path="/" render={()=><WelcomeContainer addPlayers={addPlayers}/>}/>
          <Route path="/leaderboard" component={LeaderboardContainer} />
          <Route path="/gamegrid" render={() => <GameGrid players={players}/>}/>
        </Switch>
        </>
      </Router>

      {/* <MapContainer players={players}/> */}

    </div>

  );
}

export default App;
