import axios from 'axios';
import React, {useState} from 'react';
import Navbar from '../navbar/Navbar';
import SideBar from '../sidebar/SideBar';
import './EditProfile.css';

const EditProfile  = ({user}) => {

const [profile,setProfile] = useState({
    profileBio : '',
    location: ''
      });



const handleChange = (event) => {
    setProfile({
    ...profile , [event.target.name]: event.target.value
    });
  }

const handleSubmit = (event) =>  {
        // store the states in the form data
    event.preventDefault();
    axios.put(`http://localhost:5001/api/users/${user._id}/profile`, profile)

    window.location='/profile';
  }       
    return ( 

      <div>
        <div>
          <Navbar user={user}/>
        </div>

        <div className="side__bar">
          <SideBar className="side__component"/>
          <div>
            <form onSubmit={handleSubmit} id="edit_profile">
              <div class="form-group input-group">
                <span className="border-label-flt">
                <input type="text" className="form-control" id="label-name" name='location' value={profile.location} onChange={handleChange}  placeholder="City, State, Country"  autofocus/>
                <label for="label-name">Your Location</label>
                </span>
              </div>

              <div className="form-group input-group">
                <label className="border-label-flt">
                <textarea  id="label-email" className="form-control" rows="4" name= 'profileBio' value={profile.profileBio} onChange={handleChange} placeholder="About You"  autofocus/>  
                <span>About You</span>
                </label>
              </div>
              <div>
                <button className="btn btn-lg btn-success btn-block" id="submit" type="submit">Submit</button>
              </div>
            </form>
          </div>

        </div>
      </div>
             
);
}

export default EditProfile;
