<<<<<<< Updated upstream
import React from "react";

const Profile = ({user}) => {
    
    return (
        <div>
            <img className="rounded-circle" alt="" src="../images/test.jpg" />
            <h1>You are Logged In {user.name}</h1>
=======
import React from 'react';
import Navbar from "../navbar/Navbar";
import "./profile.css";
import test from './test.jpg';
function Profile ({user})  {
    
    return (
        <div className="container">
            <div className="col-6 bio-col">
                <div className="row">
                    <img src={test} id="biopic"  />
                    <h3><span><strong>{user.name}</strong></span></h3>
                </div>
                    <p>Member Since {user.dateJoined}</p>
                    <p>Place {user.location}</p>
                <div className="row">
                    <p>About Me:
                    {user.bio_text}
                    </p>
                </div>
            </div>

            <div className="col-3" id= "post-col">              
                <p>This is for post/feed</p>
            </div>
            <div className="col-3" id="list-col">               
                <p>This is for friends list</p>
            </div>

>>>>>>> Stashed changes
        </div>
    )
}
    
export default Profile;
