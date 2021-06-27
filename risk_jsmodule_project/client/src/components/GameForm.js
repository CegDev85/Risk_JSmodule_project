import React from 'react'
import { useState, useEffect } from 'react'
import { postPlayer } from './GameService'



const GameForm = () => {

    const [players, setPlayers] = useState([])

    // const [newPlayer, setNewPlayer] = useState("")

    useEffect(() => {
        // getPlayers()
    },[])

    const getPlayers = () => {
        fetch('http://localhost:5000/api/players')
        .then(response => response.json())
        .then(players => setPlayers(players))
    }

    const addPlayer = (player) => {
        let temp = players.map(p => p);
        temp.push(player);
        setPlayers(temp);
    }
    
    const addPlayers = (playersToAdd) => {
        let temp = players.map(p => p);
        temp.push(playersToAdd[0]);
        temp.push(playersToAdd[1]);
        setPlayers(temp);
    }
        

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     postPlayer(players).then((data) => {
    //         addPlayer(data);
    //     })
    // }
    const handleSubmit = (event) => {
        event.preventDefault();
        let player_1 = event.target.player1.value;
        let player_2 = event.target.player2.value;
        let player1obj =       {
            name: player_1,
            TroopsDeployed: 0,
            TroopsLost: 0,
            TroopsDefeated: 0,
            Territories:0,
            Victories: 0
            }
        let player2obj =       {
            name: player_2,
            TroopsDeployed: 0,
            TroopsLost: 0,
            TroopsDefeated: 0,
            Territories:0,
            Victories: 0
            }
        let playersToAdd = [player1obj,player2obj]
            addPlayers(playersToAdd)
            
    }


    return (
        <div className="game-form">
            <p>This is the game form</p>
            <form onSubmit={handleSubmit} method="post">
                <label for="player1">Player 1</label>
                <input type="text" id="player1" name="player1"></input>
                <label for="player2">Player 2</label>
                <input type="text" id="player2" name="player2"></input>
                <input type="submit" value="Begin Game"></input>
            </form>
        </div>
    )
}

export default GameForm
