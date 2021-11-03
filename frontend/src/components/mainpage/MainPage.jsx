import React from 'react';
import './MainPage.css';
import Navbar from '../navbar/Navbar';
import Postings from '../postings/Postings';
import SideBar from '../sidebar/SideBar';

const MainPage = ({user}) =>{
    return (
        <div className="App">
            <Navbar user={user}/>
            
            <div className="main__page">
                <SideBar user={user}/>
                <Postings />
            </div>
        </div>
    )
}

export default MainPage;
