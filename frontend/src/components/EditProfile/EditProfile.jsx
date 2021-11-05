import axios from 'axios';
import React, {useState} from 'react';
 


function EditProfile  ({user})  {
const [profileBio,setProfileBio] = useState('');
const [location,setLocation]= useState('');

const handleChange = (event) => {
    setProfileBio(profileBio);
    setLocation(location);
    
    };
    const handleSubmit = (event) =>  {
        // store the states in the form data
        event.preventDefault();
        axios.put(`http://localhost:5001/api/users/${user._id}/profile`, {
            profileBio: profileBio,
            location: location
        }      
         )}
     //    .then ((response) => {
           
    return (
        <div>
            
           Make Changes to your Profile 
            <form className="form-group" onSubmit={(event)=>handleSubmit(event)}>
          
            
            <input type="text" id="location" className="form-control" name="profileBio" value={profileBio} onChange={handleChange} />
            <label className="form-label" htmlFor="location">Your Location (City, State):</label>
            
           
            <textarea className="form-control" id="textArea" rows="4" name="location" value={location} onChange={handleChange} />
            <label className="form-label" htmlFor="textArea"> Tell us Something about Yourself:</label>
            </form>
            <button onClick={(event)=>{handleSubmit(event)}}type="submit">Submit</button>
    
</div>
);
}

export default EditProfile;