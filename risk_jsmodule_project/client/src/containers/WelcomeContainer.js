import React from 'react'
import GameForm from '../components/GameForm'
import CountryContainer from './CountryContainer'
// import CountryList from '../components/CountryList'
// import CountrySelect from '../components/CountrySelect'
// import CountryDetail from '../components/CountryDetail'




const WelcomeContainer = ({addPlayers}) => {




    return (
        <div className="welcome-container">
            <h2>LITTLE RISK</h2>
            <GameForm  addPlayersToState={addPlayers}/>
            <CountryContainer />
            
        </div>
    )
}

export default WelcomeContainer
