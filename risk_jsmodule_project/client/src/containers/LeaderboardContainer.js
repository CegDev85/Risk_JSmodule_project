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

    return (
        <div>
            {/* <h2>This is the leaderboard container</h2> */}
            <PlayerList players={players} />
        </div>
    )
}

export default LeaderboardContainer
