import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';



const Navbar = ({user}) => {
    return (
        <div className="navbar navbar-expand-lg" >
            <ul className="navbar-nav">
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/profile'  >Profile</Link>
                </li>    
                
                {!user &&
            <React.Fragment>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/'>Login</Link>
                </li>
            </React.Fragment>
                }
        { user &&
            <React.Fragment>
                <li>
                    <Link to='/logout'>Logout</Link>
                </li>
                </React.Fragment>
        }
    </ul>
</div>
);
}

export default Navbar;
