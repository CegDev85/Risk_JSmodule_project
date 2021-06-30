import React from 'react'
import { Link } from 'react-router-dom';



const NavBar = () => {

    return (
     <div className="nav-bar">
        
                <Link to="/">Home</Link> <Link to="/leaderboard">Scoreboard</Link>
      
     </div>
   
    )
}

export default NavBar;
