import axios from 'axios';
import React, {useState} from 'react';
 


const BioForm = ({user}) => {
const [profileImg,setProfileImg] = useState();
const [biotext,setBiotext] = useState('...Anything you would like everyone to know');
const [location,setLocation]= useState('right here!');

const handleChange = (event) => {
    setProfileImg(profileImg);
    setBiotext(biotext);
    setLocation(location);
    };
    const handleSubmit = (e) =>  {
        // store the states in the form data
        e.preventDefault();
        axios.put(`localhost:5001/api/users${user._id}`)
        
                  
            }
    return (
        <div>
            Hello {user.name}, and welcome to our site! 
            <form onSubmit={handleSubmit(e)}>
            <input type="file" name="bio_pic" ref={user.profileImg} button="submit"/>
          
            Tell us Something about Yourself:
            <input type="text" name="bio_text" ref={user.bio_text} />

            Your Location (City, State):
            <input type="string" name="location" ref={user.location} />
            </form>
            <button>Submit</button>
    
</div>
);
}







export default BioForm;