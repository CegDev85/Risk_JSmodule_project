


const PlayerList = ({ players }) => {

    return (
        <div className="player-list">
            
            <h2>SCOREBOARD</h2>
            {/* <hr></hr> */}
            <ul>
                {players.map(player => {
                    return(
                        <>
                       <p>Name: {player.name}</p>
                       <p>Troops Deployed: {player.TroopsDeployed}</p>
                       <p>Troops Lost: {player.TroopsLost}</p>
                       <p>Troops Defeated: {player.TroopsDefeated}</p>
                       <p>Territories: {player.Territories}</p>
                       <p>Victories: {player.Victories}</p>
                       <br></br>
                       {/* <hr>
                       </hr> */}
            

                        </>
                    )
                })}
            </ul>
        </div>
    )

}


export default PlayerList