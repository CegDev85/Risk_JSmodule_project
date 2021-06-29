import React, {useState, useEffect} from 'react'

const PlayerUI = ({currentTerritory, gameState, players}) => {

    const [playerTurn, setPlayerTurn] = useState(null);
    const [gameRunning, SetGameRunning] = useState(true);

    useEffect(() => {
        assignTurn();
    }, [])

    const assignTurn = () => {
        if(playerTurn === null){
            setPlayerTurn(players[Math.floor(Math.random()*players.length)]);
        }
        else{
            let currentIndex = players.indexOf(playerTurn);
            if(currentIndex+1 >= players.length){
                setPlayerTurn(players[0]);
            }
            else{
                setPlayerTurn(players[currentIndex+1]);
            }
        }
        
    }


    const calcReinforcements = (activePlayer) => {
        if(gameState){
            return Math.floor((gameState.GameState.filter(GameState => GameState.occupier == activePlayer)).length / 5); 
        }
        else{
            return 0;
        }
    }

    const getBorders = (territory) => {
        if (territory !== 'None'){
            return gameState.GameState.filter(GameState => territory.borders.includes(GameState.name))
        }
    }

    const getFriendly = () => {
        let borders = getBorders(currentTerritory);
        let friendlyBorders = borders.filter(border => border.occupier == currentTerritory.occupier)
        let friendlyBorderListItems = friendlyBorders.map(b => <li key={b.id}>{b.name}</li>)
        return (
            <ul>
                {friendlyBorderListItems}
            </ul>
        )
    }
    const getEnemy = () => {
        let borders = getBorders(currentTerritory);
        let enemyBorders = borders.filter(border => border.occupier != currentTerritory.occupier)
        let enemyBorderListItems = enemyBorders.map(b => <li key={b.id}>{b.name}</li>)
        return (
            
            <ul>
                {enemyBorderListItems}
            </ul>
        )
    }

    const handleCurrent = () => {
        if (currentTerritory === 'None'){
            return (
                <>
                    <p> select a territory </p>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </>
            )
        }
        else{
            return(
                <>
                <h4>{currentTerritory.name}</h4>
                <p>Current Troops: {currentTerritory.troops}</p>
                <table>
                    <thead>
                        <th>Friendly</th>
                        <th>Enemy</th>
                    </thead>
                    <tbody>
                        <td>{getFriendly()}</td>
                        <td>{getEnemy()}</td>
                    </tbody>
                </table>
                <div className='ui-distribute-refinforcements'>
                <button>+</button>
                </div>
                </>
            )
        }
    }


    return (
        <div className='user-interface'>
            <h1>{playerTurn?.name}</h1>
            <div className='ui-reinforcements'>
                <h1>{calcReinforcements(players[0])}</h1>
            </div>

            <div className='ui-active-selection'>
                {handleCurrent()}
            </div>

            <div className='ui-end-turn'>
                    <button onClick={assignTurn}>END TURN</button>
            </div>
        </div>
    )
}


export default PlayerUI;