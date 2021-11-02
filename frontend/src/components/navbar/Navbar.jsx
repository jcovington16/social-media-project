import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';



const Navbar = ({user}) => {
    return (
        <div className="navbar navbar-expand-lg" >
            {/* <h4>Nav Bar for: {user.name}</h4> */}
            <ul className="navbar-nav bg-dark">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>    
                
                {!user &&
            <React.Fragment>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
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












//     return (
//         <div>
//             <h1>This is the navbar</h1>
//         </div>
//     )
// }

export default Navbar;