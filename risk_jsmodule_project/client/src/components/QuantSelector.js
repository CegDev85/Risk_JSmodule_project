import React from 'react'
import  '../QuantSelector.css';

const QuantSelector = ({trigger, setTrigger}) => {
    return (trigger) ?(
        
        <div className='popup'>
            <div className='popup-inner'>
                <h5>How many troops to commit?!</h5>
                <input type='number'/>
                <button>Ok</button>
                <button onClick={() => setTrigger(false)}>Cancel</button>
            </div>
        </div>
    ): '';
} 

export default QuantSelector;