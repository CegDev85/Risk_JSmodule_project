import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import WelcomeContainer from './containers/WelcomeContainer';
import LeaderboardContainer from './containers/LeaderboardContainer';
import NavBar from './components/NavBar';





function App() {
  return (
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
      
    
    </div>
    
  );
}

export default App;
