import React from 'react';
import './SideBar.css';
import SideRow from '../siderow/SideRow';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const SideBar = (props) => {
    return (
        <div className="sidebar">
            <SideRow Icon={AccountCircleIcon} title="Edit Profile"/>
            <SideRow Icon={PeopleIcon} title="Friends" />
            <SideRow Icon={GroupAddIcon} title="Requests" />
            <hr />
        </div>
    )
}

export default SideBar;