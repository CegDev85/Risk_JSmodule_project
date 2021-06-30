import React from 'react'

function WinnerBanner({trigger, setTrigger, winner}) {
    return(trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <h4>{winner} won!</h4>
                <button className='close-summary' onClick={() => setTrigger(false)}>X</button>
            </div>
        </div>
    ): '';
}

export default WinnerBanner;
