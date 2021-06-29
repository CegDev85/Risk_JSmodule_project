// Grid goes here

import React from 'react'
import MapContainer from '../containers/MapContainer'
import GameMap from './GameMap'

const GameGrid = ({players}) => {
    return (
        <div>
           
            <h1>PLAN YOUR ATTACK!</h1>
            {/* <MapContainer players={players}/> */}
            <GameMap players={players}/>
            
        </div>
    )
}

export default GameGrid
