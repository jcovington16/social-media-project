import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import SideBar from '../sidebar/SideBar';
import axios from 'axios';
import './Friends.css';

const Friends = ({user}) => {

    const [friends, setFriends] = useState('');
    const [users, setUsers] = useState('');
    const url = user ? `http://localhost:5001/api/users/${user._id}/friends` : '';

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setFriends(res.data);
        });
    }, [url]);



    return (
        <div>
            <Navbar user={user}/>

            <div className="side__bar">
                <SideBar className="side__component"/>

                <div className="friendsList">
                    <h3>Friends List</h3>

                    {//TODO: Need to implement a map or for loop}
                    <ul>
                        <li>
                            {friends[0]}
                        </li>
                        <li>
                            {friends[1]}
                        </li>
                    </ul>
                </div>
                
            </div>
            
        </div>
    )
}

export default Friends;
