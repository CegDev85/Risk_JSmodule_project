import React from 'react'
import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { postPlayer } from './GameService'
import GameGrid from './GameGrid'




const GameForm = ({addPlayersToState}) => {

    const [players, setPlayers] = useState([])
    const [showGameGrid, setShowGameGrid] = useState(false)



    useEffect(() => {
        // getPlayers()
    },[])

    if(showGameGrid){
        return <Redirect to="/gamegrid"/>
    }


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
            addPlayersToState(playersToAdd)
            pageRedirect()
            
    }

    const pageRedirect = () => {
        setShowGameGrid(true)
    }


    return (
        <div className="game-form">
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit} method="post" >
                <label htmlFor="player1">Player 1:    </label>
                <input type="text" id="player1" name="player1" placeholder="Enter your Army name"></input>    
                <label htmlFor="player2">Player 2:    </label>
                <input type="text" id="player2" name="player2" placeholder="Enter your Army name"></input>
                <input className="input" type="submit" value="Begin Game"></input>
                
            </form>
        </div>
    )
}

export default GameForm
