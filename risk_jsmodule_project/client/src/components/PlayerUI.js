import React, {useState, useEffect} from 'react'
import QuantSelector from './QuantSelector';

const PlayerUI = ({currentTerritory, gameState, players, incrementTroops, changeOccupier}) => {

    const [playerTurn, setPlayerTurn] = useState(null);
    const [gameRunning, SetGameRunning] = useState(false);
    const [refinforcements, setReinforcements] = useState(0);
    const [rounds, setRounds] = useState(-1);
    const [targetTerritory, setTargetTerritory] = useState({"territory": null, "isFriendly": false})
    const [quantitySelectorTrigger, setQuantitySelectorTrigger] = useState(false);
    const [troopsInPlay, setTroopsInPlay] = useState(null);

    useEffect(() => {
        assignTurn();
        SetGameRunning(true);
    }, [])

    useEffect(() => { 
        if(playerTurn){
            calcReinforcements(playerTurn);
        }
    }, [playerTurn])

    useEffect(() => {
        setTargetTerritory({"territory": null, "isFriendly": false})
    },[currentTerritory])

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

    const handleTargetTerritory = (id, isFriendly) => {
        setTargetTerritory({
            "territory": gameState.GameState.filter(b => b.id === id)[0], 
            "isFriendly": isFriendly
        });
        setQuantitySelectorTrigger(true);
    }

    const getFriendly = () => {
        let borders = getBorders(currentTerritory);
        let friendlyBorders = borders.filter(border => border.occupier == currentTerritory.occupier)
        let friendlyBorderListItems = null;
        if(currentTerritory.occupier === playerTurn){
            friendlyBorderListItems = friendlyBorders.map(b => <li key={b.id}>
                <div className="friendly-border-list">
                 <button onClick={() => handleTargetTerritory(b.id, true)}>{b.name}</button>
                 </div>
                 </li>)
        }
        else{
            friendlyBorderListItems = friendlyBorders.map(b => <li key={b.id}>{b.name}</li>)
        }
        return (
            <div>
                <ul>
                <li>{friendlyBorderListItems}</li>
                </ul>
            
            </div>
        )
    }
    const getEnemy = () => {
        let borders = getBorders(currentTerritory);
        let enemyBorders = borders.filter(border => border.occupier != currentTerritory.occupier)
        let enemyBorderListItems = null;
        if(currentTerritory.occupier === playerTurn){
            enemyBorderListItems = enemyBorders.map(b => <li key={b.id}>
                <div className="enemy-border-items">
                <button onClick={() => handleTargetTerritory(b.id, false)}>{b.name}</button>
                </div>
                </li>);
        }else{
            enemyBorderListItems = enemyBorders.map(b => <li key={b.id}>{b.name}</li>)
        }
        return (
            <div className="enemy-border-items" >
            <ul>
                <li>{enemyBorderListItems}</li>
            </ul>
            </div>
        )
    }

    const deploy = () => {
        if(playerTurn != currentTerritory.occupier){
            console.log('You cant deploy troops behind enemy lines');
        }
        else{
            if(refinforcements > 0){
                incrementTroops(1, currentTerritory)
                setReinforcements(refinforcements-1);
            }
            else{
                console.log('You have used all your reinforcements');
            }
        }
    }

    const commitTroops = (noTroops) => {
        if(targetTerritory.isFriendly){
            // Add/Subtract noTroops
            incrementTroops(-parseInt(noTroops), currentTerritory);
            incrementTroops(parseInt(noTroops), targetTerritory.territory);
        }
        else{
            // Do fight. 
            let attackingTroops = noTroops;
            let defendingTroops = 1;
            if (targetTerritory.territory.troops > 1){
                defendingTroops = 2;
            }
            let rolls = [[],[]];
            for(let i=0; i<attackingTroops; i++){
                rolls[0].push(Math.floor(Math.random() * 7))
            }
            for(let i=0; i<defendingTroops; i++){
                rolls[1].push(Math.floor(Math.random() * 7))
            }
            console.log(`Rolls pre-sort: ${rolls[0]} - ${rolls[1]}`);

            rolls[0].sort();
            rolls[1].sort();
            rolls[0].reverse();
            rolls[1].reverse();
            console.log(`Rolls post-sort: ${rolls[0]} - ${rolls[1]}`);
            
            if(!isNaN(rolls[0][1]) && !isNaN(rolls[1][1])){         //Are both attacker and defender using at least 2 troops?
                if(rolls[1][1] >= rolls[0][1]){
                    // Defender wins
                    incrementTroops(-1, currentTerritory);
                }
                else{
                    // Attacker wins
                    incrementTroops(-1, targetTerritory.territory)
                }
            }
            if(rolls[1][0] >= rolls[0][0]){
                // Defender wins
                incrementTroops(-1, currentTerritory);
            }
            else{
                // Attacker wins
                incrementTroops(-1, targetTerritory.territory)
            }

            if(targetTerritory.territory.troops === 0){
                // If defender is defeated..
                changeOccupier(playerTurn, targetTerritory.territory);
                incrementTroops(1, targetTerritory.territory);
                incrementTroops(-1, currentTerritory);
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
                <button onClick={deploy}>Deploy Troop</button>
                </div>
                </>
            )
        }
    }


    return (
        <>
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
        <div className='input-handler'>
            <QuantSelector trigger={quantitySelectorTrigger} setTrigger={setQuantitySelectorTrigger} target={targetTerritory} commitTroops={commitTroops} currentTerritory={currentTerritory}/>
        </div>
        </>
    )
}


export default PlayerUI;