import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import SideBar from '../sidebar/SideBar';
import axios from 'axios';
import './Friends.css';

const Friends = ({user}) => {

    const [friends, setFriends] = useState([]);

    const url = user ? `http://localhost:5001/api/users/${user._id}/friends` : '';

    const handleRemove = (e) => {
        e.preventDefault();
        const remove = user ? `http://localhost:5001/api/users/${user._id}/friends` : '';
        axios.delete(remove);
    }

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

                    <div>
                        {friends.map((info) => {
                            return (
                                <ul key={info.id}>
                                    <li>{info.name} <button value={info.id} onClick={(e) => handleRemove(e)}>remove</button></li>
                                </ul>
                            )
                        })}
                    </div>

                </div>
                
            </div>
            
        </div>
    )
}

export default Friends;
