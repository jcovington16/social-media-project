import React from 'react'
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import Posts from '../posts/Posts';
import './MainPage.css';

function MainPage() {
    return (
        <div>
            <div>
                <Navbar/>
            </div>

            <div className="main__page">
                <Sidebar/>
                <Posts/>
            </div>

            
        </div>
    )
}

export default MainPage
