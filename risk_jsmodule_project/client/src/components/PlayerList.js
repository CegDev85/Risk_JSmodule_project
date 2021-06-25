


const PlayerList = ({ players }) => {

    return (
        <div id="player-list">
            <h2>LEADERBOARD</h2>
            <hr></hr>
            <ul>
                {players.map(player => {
                    return(
                        <>
                       <li >Name: {player.name}</li>
                       <li>Troops Deployed: {player.TroopsDeployed}</li>
                       <li>Troops Lost: {player.TroopsLost}</li>
                       <li>Troops Defeated: {player.TroopsDefeated}</li>
                       <li>Territories: {player.Territories}</li>
                       <li>Victories: {player.Victories}</li>
                       <br></br>

                        </>
                    )
                })}
            </ul>
        </div>
    )

}


export default PlayerList