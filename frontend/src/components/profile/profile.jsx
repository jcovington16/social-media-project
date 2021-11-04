import React, {useState} from 'react';
import axios from 'axios';
import Navbar from "../navbar/Navbar";
import "./profile.css";
import test from './test.jpg';
import { TextareaAutosize } from '@material-ui/core';

const Profile = ({user}) =>  {

    // const [profileImg,setProfileImg] = useState();
    // const [biotext,setBiotext] = useState('...Anything you would like everyone to know');
    // const [location,setLocation]= useState('right here!');
    
    // const handleChange = (event) => {
    //     setProfileImg(profileImg);
    //     setBiotext(biotext);
    //     setLocation(location);
    //     };
    //     const handleSubmit = (event) =>  {
    //         // store the states in the form data
    //         event.preventDefault();
    //         axios.put(`localhost:5001/api/users/${user._id}/profile`)      
    //             }
    return (
        <div>
            <Navbar user={user}/>
            {user && <div className="container">
           
            <div className="col-6 bio-col">
                    <img src={test} id="biopic" alt="" />
                    <h3><span><strong>{user.name}</strong></span></h3>
                    <p>Member Since {user.dateJoined}</p>
                    {user.profileBio}

            </div>
            <form>
                <div class="form-outline">
                    <input type="text" id="userLocation" class="form-control" />
                    <label class="form-label" for="userLocation">Location</label>
                </div>
                <div className="row">
                <div class="form-outline">
                <textarea></textarea>
                    <label class="form-label" for="profileBio">Tell Us About Yourself</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </div>
            </form>
        </div>}
    </div>
    )
}
    
export default Profile;
