import React from "react";

const Profile = ({user}) => {
    
    return (
        <div>
            <img className="rounded-circle" alt="" src="../images/test.jpg" />
            <h1>You are Logged In {user.name}</h1>
        </div>
    )
}
    
export default Profile;
