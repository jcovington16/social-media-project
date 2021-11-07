import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import SideBar from '../sidebar/SideBar';
import './Requests.css';

const Requests = ({user}) => {

    const [requests, setRequests] = useState([]);

    const url = user ? `http://localhost:5001/api/users/${user._id}/requests` : '';

    
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setRequests(res.data);
        });
    }, [url]);

    const handleDeny = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:5001/api/users/${user._id}/requests`)     
    }

    const handleAccept = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5001/api/users/${user.id}/accept`)
    }

    return (
        <div>
            <Navbar user={user}/>

            <div className="side__bar">
                <SideBar className="side__component" />

                <div className="friendRequests">
                    <h3>Pending Requests</h3>

                    <div>
                        {requests.map((info) => {
                            return (
                                <ul key={info.id}>
                                    <li>{info.name} <button value={info.id} onClick={(e) => handleAccept(e)}>Accept</button> / <button value={info.id} onClick={(e) => handleDeny(e)}>Deny</button></li>
                                </ul>
                            )
                        })}
                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default Requests;
