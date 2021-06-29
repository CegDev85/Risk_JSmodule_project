import React from 'react'

function BattleSummary({trigger, setTrigger, battleReport}) {
    
    const territoryLost = () => {
        if(battleReport.territoryTaken){
            return(
                <p>TERRITORY TAKEN!</p>
            );
        }
        return null;
    }
    
    
    return (trigger) ?(
        <div className='popup'>
            <div className='popup-inner'>
                <h3>BATTLE REPORT:</h3>
                <p>attacker: {battleReport.attacker}: </p>
                <p>rolls: {battleReport.attackingRolls}</p>
                <p>casualties: {battleReport.attackingCasualties}</p>
                <br/>
                <p>defender: {battleReport.defender}</p>
                <p>rolls: {battleReport.defendingRolls}</p>
                <p>casualties: {battleReport.defendingCasualties}</p>
                <br />
                {territoryLost()}
                <button onClick={() => setTrigger(false)}>Cancel</button>
            </div>
        </div>
    ): '';
} 

export default BattleSummary
