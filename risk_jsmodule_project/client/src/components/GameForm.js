import React from 'react'
import { useState } from 'react'



const GameForm = () => {

//     const [player, setPlayer] = useState({
//         name: "",
//         TroopsDeployed: 0,
//         TroopsLost: 0,
//         TroopsDefeated: 0,
//         Territories:0,
//         Victories: 0

    // }) //unsure lol

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     postPlayer(player).then((data) => {
    //         addPlayer(data);
    //     })
    // }
    


    return (
        <div className="game-form">
            <p>This is the game form</p>
            {/* <form onSubmit={handleSubmit} method="Post"> */}
            <form >
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
