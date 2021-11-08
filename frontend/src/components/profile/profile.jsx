import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from "../navbar/Navbar";
import "./profile.css";
import moment from 'moment';
import test from './test.jpg';
import EditProfile from '../EditProfile/editprofile';


const  Profile = ({user}) => {

    const [profile,setProfile] = useState('');
    const url = user ? `http://localhost:5001/api/users/${user._id}/profile` :'';
    useEffect (() => {
    axios.get(url)      
    .then ((response) => {
    setProfile(response.data)
    }).catch(err => console.log(err))
    },[url] )
           
    return (
        <div>
            <Navbar user={user}/>
            {user && <div className="container">
           
            <div className="col bio-col">
                    <img src={test} id="biopic" alt="" />

                    <h3 id="name"><strong>{profile.name}</strong></h3>

                    <span className="label" id="loc_label"><strong></strong></span> <span id="loc_text">{profile.location}</span>
                    <div className="row" id="toprow">
                    <div className="col-2 label" id="join_label"><strong>Member Since</strong></div><div className="col" id="date_text">{moment(profile.dateJoined).format("MMMM YYYY")}</div>
                    </div>   
                    <div className="row" id="btmrow">
                    <div className="col-2 label" id="bio_label"><strong>About Me</strong></div><div className="col" id="bio_text">{profile.profileBio}</div>
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
