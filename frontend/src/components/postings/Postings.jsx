import React from 'react';
import './Postings.css';
import Posts from '../posts/Posts'

const Postings = ({user}) => {
    return (
        <div className="postings">
            <Posts user={user}/>

            
        </div>
    )
}

export default Postings;
