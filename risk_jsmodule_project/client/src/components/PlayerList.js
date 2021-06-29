


const PlayerList = ({ players }) => {

    return (
        <div id="player-list">
            <h2>LEADERBOARD</h2>
            <hr></hr>
            <ul>
                {players.map(player => {
                    return(
                        <>
                       <p >Name: {player.name}</p>
                       <p>Troops Deployed: {player.TroopsDeployed}</p>
                       <p>Troops Lost: {player.TroopsLost}</p>
                       <p>Troops Defeated: {player.TroopsDefeated}</p>
                       <p>Territories: {player.Territories}</p>
                       <p>Victories: {player.Victories}</p>
                       <hr></hr>
                       <br></br>
            

                        </>
                    )
                })}
            </ul>
        </div>
    )

}


export default PlayerList