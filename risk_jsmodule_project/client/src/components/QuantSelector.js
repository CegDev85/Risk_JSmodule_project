import React, {useState} from 'react'
import  '../QuantSelector.css';

const QuantSelector = ({trigger, setTrigger, target, commitTroops, currentTerritory}) => {

    const [uInput, setUInput] = useState(0);


    const determineTarget = () => {
        if(target.isFriendly){
            return(
                <>
                    <h3>Troops to move..</h3>
                    <p>Note: you must leave at least one unit on the terittory you are moving from.</p>
                    <form onSubmit={handleInput}>
                        <input type='number' max={currentTerritory.troops-1} min='0' onChange={handleChange}/>
                        <input type='submit' value='ok'/>
                    </form>
                </>
            );
        }
        else{
            let max = currentTerritory.troops-1;
            if(max > 3){ max = 3 }
            return(
                <>
                    <h3>Troops to attack with..</h3>
                    <p>Note: You may attack with UPTO three troops per attack, and must always leave at least one unit to hold your current territory</p>
                    <form onSubmit={handleInput}>
                        <input type='number' max={max} min='0' onChange={handleChange}/>
                        <input type='submit' value='ok'/>
                    </form>
                </>
            );
        }
    }

    const handleChange = (e) => {
        setUInput(e.target.value);
        console.log(uInput);
    }
 
    const handleInput = (e) => {
        e.preventDefault();
        commitTroops(uInput);
        setTrigger(false);
    }
    
    
    
    return (trigger) ?(
        <div className='popup'>
            <div className='popup-inner'>
                {determineTarget()}
                <button onClick={() => setTrigger(false)}>Cancel</button>
            </div>
        </div>
    ): '';
} 

export default QuantSelector;