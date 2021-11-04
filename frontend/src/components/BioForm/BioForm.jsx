import axios from 'axios';
import React, {useState} from 'react';
 


function BioForm  ({user})  {
const [profileImg,setProfileImg] = useState();
const [biotext,setBiotext] = useState('...Anything you would like everyone to know');
const [location,setLocation]= useState('right here!');

const handleChange = (event) => {
    setProfileImg(profileImg);
    setBiotext(biotext);
    setLocation(location);
    };
    const handleSubmit = (event) =>  {
        // store the states in the form data
        event.preventDefault();
        axios.put(`localhost:5001/api/users/${user._id}/profile`)      
            }
    return (
        <div>
            
            Hello {user.name}, and welcome to our site! 
            <form onSubmit={(event)=>handleSubmit(event)}>
            <input type="file" name="profileImg" value={user.profileImg} onChange={handleChange}/>
          
            Tell us Something about Yourself:
            <input type="text" name="profileBio" value={user.profileBio} onChange={handleChange} />

            Your Location (City, State):
            <input type="string" name="location" ref={user.location} onChange={handleChange} />
            </form>
            <button>Submit</button>
    
</div>
);
}







export default BioForm;