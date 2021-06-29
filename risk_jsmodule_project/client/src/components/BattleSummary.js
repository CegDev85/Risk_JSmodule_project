import React from 'react'

function BattleSummary({trigger, setTrigger, battleReport}) {
    
    const territoryLost = () => {
        if(battleReport.territoryTaken){
            return(
                <h3 className='winner-stamp'>TERRITORY TAKEN!</h3>
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
                <button className='close-summary' onClick={() => setTrigger(false)}>X</button>
            </div>
        </div>
    ): '';
} 

export default BattleSummary
