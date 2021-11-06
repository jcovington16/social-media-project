//This is our logout form

const Logout = () => {
    localStorage.removeItem('token');
    window.location="/";
     
}

export default Logout;
