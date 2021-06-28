import React from 'react'

const PlayerUI = ({currentTerritory, gameState, players}) => {

    const getFriendly = () => {
        return (
            <ul>
                <li>Sample Territory</li>
                <li>Sample Territory</li>
            </ul>
        )
    }
    const getEnemy = () => {
        return (
            
            <ul>
                <li>Sample Territory</li>
                <li>Sample Territory</li>
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