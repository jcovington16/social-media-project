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
    .then ((response) => console.log(response))
    .catch ((error) => console.log (error))
 }
    
           
    return ( 
      <div>
        <div>
          <Navbar user={user}/>
        </div>

        <div className="side__bar">
          <SideBar className="side__component"/>

          <div className="editProfile">

            <h3>Edit Profile</h3>

            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                id="location"
                name='location' 
                value={profile.location}
                onChange={handleChange} 
              />
                <label 
                  className="form-label" 
                  htmlFor="location">Your Location (City, State):
                </label>
                
                <textarea 
                  id="textArea" 
                  rows="4" 
                  name= 'profileBio' 
                  value={profile.profileBio} 
                  onChange={handleChange} 
                />
                <label className="form-label" 
                htmlFor="textArea"> Tell us Something about Yourself:</label>
                <button type="submit">Submit</button>
            </form>
          </div>

        </div>



      </div>
             
);
}

export default EditProfile;
