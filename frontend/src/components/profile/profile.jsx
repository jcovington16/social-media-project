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
           
            <div className="col-6 bio-col">
                    <img src={test} id="biopic" alt="" />
                    <h3><p><strong>{profile.name}</strong></p></h3>
                    <p className="label" id="loc_label"><strong>    Location</strong> {profile.location}</p>
                    <p className="label" id="join_label"><strong>     Member Since</strong>{(profile.dateJoined)}</p>
                    <p className="label" id="bio_label"><strong>     About Me</strong>{profile.profileBio}</p>
<EditProfile user={user}/>
            </div>
            
        </div>}
    </div>
    )
}
    
export default Profile;
