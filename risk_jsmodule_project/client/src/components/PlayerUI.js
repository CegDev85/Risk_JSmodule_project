import React, {useState} from 'react'

const PlayerUI = ({currentTerritory, gameState, players}) => {

    const [playerTurn, setPlayerTurn] = useState(null);
    const [gameRunning, SetGameRunning] = useState(true);

    const getBorders = (territory) => {
        if (territory !== 'None'){
            return gameState.GameState.filter(GameState => territory.borders.includes(GameState.name))
        }
    }

    const getFriendly = () => {
        let borders = getBorders(currentTerritory);
        let friendlyBorders = borders.filter(border => border.occupier == currentTerritory.occupier)
        let friendlyBorderListItems = friendlyBorders.map(b => <li>{b.name}</li>)
        return (
            <ul>
                {friendlyBorderListItems}
            </ul>
        )
    }
    const getEnemy = () => {
        let borders = getBorders(currentTerritory);
        let enemyBorders = borders.filter(border => border.occupier != currentTerritory.occupier)
        let enemyBorderListItems = enemyBorders.map(b => <li>{b.name}</li>)
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
            <div className='ui-reinforcements'>
                <h1>10</h1>
            </div>

            <div className='ui-active-selection'>
                {handleCurrent()}
            </div>

            <div className='ui-end-turn'>
                    <button>END TURN</button>
            </div>
        </div>
    )
}


export default PlayerUI;