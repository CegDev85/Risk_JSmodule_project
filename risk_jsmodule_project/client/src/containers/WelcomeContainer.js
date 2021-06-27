import React from 'react'
import GameForm from '../components/GameForm'




const WelcomeContainer = ({addPlayer}) => {




    return (
        <div className="welcome-container">
            <h2>LITTLE RISK</h2>
            <GameForm addPlayer={addPlayer}/>
            
        </div>
    )
}

export default WelcomeContainer
