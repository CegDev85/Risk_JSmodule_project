import React from 'react'
import GameMap from '../components/GameMap';

const MapContainer = ({players}) => {
    return (
        <div className='map-container'>
            <GameMap players={players}/>
        </div>
    )
}


export default MapContainer;