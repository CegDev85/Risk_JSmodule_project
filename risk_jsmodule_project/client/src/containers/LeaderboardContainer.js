import React from 'react'
import { useEffect, useState } from 'react'
import PlayerList from '../components/PlayerList'



const LeaderboardContainer = () => {

    const [players, setPlayers] = useState([])


    useEffect(() => {
        getPlayers()
    },[])

    const getPlayers = () => {
        fetch('http://localhost:5000/api/players')
        .then(response => response.json())
        .then(players => setPlayers(players))
    }

    // const addPlayer = () => {

    // }

    return (
        <div>
           
            <PlayerList players={players} />
            
        </div>
    )
}

export default LeaderboardContainer
