import React from 'react';
import './MainPage.css';
import Navbar from '../navbar/Navbar';
import Postings from '../postings/Postings';
import SideBar from '../sidebar/Sidebar';

const MainPage = ({user}) =>{
    return (
        <div className="App">
            <Navbar user={user}/>
            <p>Hi, {user.name}!</p>
            <div className="main__page">
                <SideBar user={user}/>
                <Postings user={user}/>

            </div>
        </div>
    )
}

export default MainPage;
