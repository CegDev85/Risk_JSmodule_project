// Grid goes here

import React from 'react'
import MapContainer from '../containers/MapContainer'
import GameMap from './GameMap'

const GameGrid = ({players}) => {
    return (
        <div className="gamegrid">
           
            <h1>COMMAND YOUR ARMY!</h1>
            <GameMap players={players}/>
            
        </div>
    )
}

export default GameGrid
