import React from 'react'
import { Link } from 'react-router-dom';



const NavBar = () => {

    return (
     <div className="nav-bar">
        {/* <ul>
            <li> */}
                <Link to="/">Home</Link> <Link to="/leaderboard">Scoreboard</Link>
            {/* </li>
            <li> */}
                {/* <Link to="/leaderboard">Leaderboard</Link> */}
            {/* </li>
        </ul> */}
     </div>
   
    )
}

export default NavBar;
