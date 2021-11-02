import React from 'react';

//This is our logout form

function Logout() {
    localStorage.removeItem('token');
    window.location="/login";
     
}

export default Logout;
