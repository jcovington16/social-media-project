import React from 'react';
import './SideBar.css';
import SideRow from '../siderow/SideRow';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';


const SideBar = ({user}) => {
    return (
        <div className="sidebar">

            {/* working with multer to pull this off */}
            <img src='' alt=''/>

            <SideRow Icon={AccountCircleIcon} title="Edit Profile" />

            <Link to='/friendsList' user={user} style={{textDecoration: 'none'}}>
                <SideRow Icon={PeopleIcon} title="Friends" />
            </Link>

            <Link to='/requests' user={user} style={{textDecoration: 'none'}}>
                <SideRow Icon={GroupAddIcon} title="Requests" />
            </Link>
            <hr />
        </div>
    )
}

export default SideBar;