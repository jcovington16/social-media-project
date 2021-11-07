import axios from 'axios';
import React, {useState, useEffect} from 'react';




const Post = ({user}) => {

    const url = user ? `http://localhost:5001/api/posts/6181e32f78396102af864adb/friends/post` : '' ;


   const[userPost, setUserPost] = useState([]);
   useEffect (() => {
     axios.get(url)
        .then ((response) => {
            setUserPost (response.data);  
            // console.log(response.data);
        })
    }, [url]); 
           
     return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <span className="postUsername">
                            {user.username}
                        </span>
                    </div>
                </div>
                <div className="postCenter">
                    {userPost.map((post)=>{
                        return(
                            <ul key="timeline">
                                <li id="post_div">{post.text}, {post.username}</li>
                            </ul>
                        )
                    })}
                </div>
                <div className="postBottom">
                </div>
            </div>
        </div>
    );
}
export default Post;