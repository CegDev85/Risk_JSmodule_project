import './App.css';
import WelcomeContainer from './containers/WelcomeContainer';
import LeaderboardContainer from './containers/LeaderboardContainer';

function App() {
  return (
    <div className="App">
      {/* <h1>Hello Bois</h1> */}
      <LeaderboardContainer />
      <WelcomeContainer />
    
    </div>
  );
}

export default App;
