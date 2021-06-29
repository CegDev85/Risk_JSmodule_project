import React, {useState, useEffect} from 'react'

const PlayerUI = ({currentTerritory, gameState, players, incrementTroops}) => {

    const [playerTurn, setPlayerTurn] = useState(null);
    const [gameRunning, SetGameRunning] = useState(false);
    const [refinforcements, setReinforcements] = useState(0);
    const [rounds, setRounds] = useState(-1);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        assignTurn();
        SetGameRunning(true);
    }, [])

    useEffect(() => {
        if(playerTurn){
            calcReinforcements(playerTurn);
        }
    }, [playerTurn])

    const assignTurn = () => {
        setRounds(rounds+1);
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
            try{
                setReinforcements(Math.floor((gameState.GameState.filter(GameState => GameState.occupier == activePlayer)).length / 5));
                if(refinforcements < 3){ setReinforcements(3) }
            }
            catch (error){
                console.error(error);
                console.log(`Failed to calculate reinforcements for ${activePlayer.name}`)
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

    const deploy = () => {
        if(playerTurn != currentTerritory.occupier){
            console.log('You cant deploy troops behind enemy lines');
        }
        else{
            if(refinforcements > 0){
                incrementTroops();
                setReinforcements(refinforcements-1);
            }
            else{
                console.log('You have used all your reinforcements');
            }
        }
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
                <button onClick={deploy}>+</button>
                </div>
                </>
            )
        }
    }


    return (
        <div className='user-interface'>
            <h1>{playerTurn?.name}</h1>
            <div className='ui-reinforcements'>
                <h1>{refinforcements}</h1>
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