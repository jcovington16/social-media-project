import React from 'react';

//This is our logout form

function Logout() {
    localStorage.removeItem('token');
    window.location="/";
     
}

export default Logout;
