import React from 'react'
import GameForm from '../components/GameForm'
import CountryContainer from './CountryContainer'
import CountryList from '../components/CountryList'
import CountrySelect from '../components/CountrySelect'
import CountryDetail from '../components/CountryDetail'




const WelcomeContainer = ({addPlayer}) => {




    return (
        <div className="welcome-container">
            <h2>LITTLE RISK</h2>
            <GameForm addPlayer={addPlayer}/>
            <CountryContainer />
            
        </div>
    )
}

export default WelcomeContainer
