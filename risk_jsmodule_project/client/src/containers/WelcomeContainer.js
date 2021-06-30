import React from 'react'
import GameForm from '../components/GameForm'
import CountryContainer from './CountryContainer'
import Song from '../components/Song'





const WelcomeContainer = ({addPlayers}) => {




    return (
        <div className="welcome-container">
            <h1>LITTLE RISK</h1>
            <Song />
            
            <GameForm  addPlayersToState={addPlayers}/>
            <div className="country-container">
                <CountryContainer />
            </div>
            </div>
            
        
    )
}

export default WelcomeContainer
