// Grid goes here

import React from 'react'
import MapContainer from '../containers/MapContainer'

const gameGrid = ({players}) => {
    return (
        <div>
           
            <h1>This is the Game</h1>
            <MapContainer players={players}/>
            
        </div>
    )
}

export default gameGrid
