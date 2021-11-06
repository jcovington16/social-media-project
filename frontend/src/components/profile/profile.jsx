import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from "../navbar/Navbar";
import "./profile.css";
import test from './test.jpg';
import EditProfile from '../EditProfile/EditProfile';

const Profile = ({user}) =>  {

    const [profile,setProfile] = useState('');
    useEffect (() => {
    axios.get(`http://localhost:5001/api/users/617a22627b66258c2ecc429c/profile`)      
    .then ((response) => {
    setProfile(response.data)
    }).catch(err => console.log(err))
    }, [])
           
    return (
        <div>
            <Navbar user={user}/>
            {user && <div className="container">
           
            <div className="col bio-col">
                    <img src={test} id="biopic" alt="" />

                    <h3><p><strong>{profile.name}</strong></p></h3>
                    <span className="label" id="loc_label"><strong></strong></span> <span id="loc_text">{profile.location}</span>
                    <div className="row">
                    <div className="col label" id="join_label"><strong>Member Since</strong></div><div className="col" id="date_text">{(profile.dateJoined)}</div>
                    </div>   
                    <div className="row">
                    <div className="col label" id="bio_label"><strong>About Me</strong></div><div className="col" id="bio_text">{profile.profileBio}</div>
                    </div>

                    <h3><span><strong>{user.name}</strong></span></h3>
                    <p>Member Since {user.dateJoined}</p>
                    {user.profileBio}

            </div>
           
        </div>}
    </div>
    )
}
    
export default Profile;
