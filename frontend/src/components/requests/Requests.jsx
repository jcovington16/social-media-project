import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import SideBar from '../sidebar/SideBar';
import './Requests.css';

const Requests = ({user}) => {

    const [requests, setRequests] = useState('');
    const [users, setUsers] = useState('');
    const url = user ? `http://localhost:5001/api/users/${user._id}/requests` : '';

    
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setRequests(res.data);
        });
    }, [url]);

    return (
        <div>
            <Navbar user={user}/>

            <div className="side__bar">
                <SideBar className="side__component" />

                <div className="friendRequests">
                    <h3>Pending Requests</h3>

                </div>

            </div>
            
        </div>
    )
}

export default Requests;
