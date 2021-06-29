import React from 'react'
import GameMap from '../components/GameMap';
import GameGrid from '../components/GameGrid';


const MapContainer = ({players}) => {
    return (
        <div className='map-container'>
            {/* <GameMap players={players}/> */}
            <GameGrid players={players}/>
        </div>
    )
}


export default MapContainer;