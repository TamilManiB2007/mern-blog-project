import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import axios from "axios";  <-- Remove this
import API from "../api";     // <-- Import our API helper

export default function Menu({ cat }) {
  const [posts, setPosts] = useState([]);
  
  // Get current post ID from URL to exclude it
  const location = useLocation();
  const currentPostId = location.pathname.split("/")[2];

  // --- DEFINE IMAGE URL (Render Backend) ---
  const PF = "https://tamilmaniblog-backend.onrender.com/images/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- CHANGE: Use API instead of axios ---
        // Old: axios.get(`http://localhost:5000/api/posts`);
        
        // New:
        const res = await API.get("/posts");
        
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  // FILTER: Remove the post we are currently reading
  const otherPosts = posts.filter(post => post._id !== currentPostId);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {otherPosts.map((post) => (
        <div className="post" key={post._id}>
          {post.img && (
             <img 
             // --- CHANGE: Use PF variable for images ---
             src={post.img.includes("http") ? post.img : PF + post.img} 
             alt="" 
           />
          )}
          <h2>{post.title}</h2>
          
          <Link to={`/post/${post._id}`} onClick={handleScrollTop}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
}