import React from 'react';
import './MainPage.css';
import Navbar from '../navbar/Navbar';
import Postings from '../postings/Postings';
import SideBar from '../sidebar/SideBar';

const MainPage = () =>{
    return (
        <div className="App">
            <Navbar />
            
            <div className="main__page">
                <SideBar />
                <Postings />
            </div>
        </div>
    )
}

export default MainPage;
