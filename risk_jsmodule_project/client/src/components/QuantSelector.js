import React from 'react'
import  '../QuantSelector.css';

const QuantSelector = ({trigger, setTrigger, target}) => {


    const determineTarget = () => {
        if(target.isFriendly){
            return(
                <>
                    <h3>Troops to move..</h3>
                </>
            );
        }
        else{
            return(
                <>
                    <h3>Troops to attack with..</h3>
                </>
            );
        }
    }

    const handleInput = () => {

    }
    
    
    
    return (trigger) ?(
        <div className='popup'>
            <div className='popup-inner'>
                {determineTarget()}
                <input type='number'/>
                <button>Ok</button>
                <button onClick={() => setTrigger(false)}>Cancel</button>
            </div>
        </div>
    ): '';
} 

export default QuantSelector;