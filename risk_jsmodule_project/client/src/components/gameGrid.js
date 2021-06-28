// Grid goes here

import React from 'react'
import MapContainer from '../containers/MapContainer'
import GameMap from './GameMap'

const GameGrid = ({players}) => {
    return (
        <div>
           
            <h1>This is the Game</h1>
            {/* <MapContainer players={players}/> */}
            <GameMap players={players}/>
            
        </div>
    )
}

export default GameGrid
