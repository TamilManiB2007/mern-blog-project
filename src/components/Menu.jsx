import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation

export default function Menu({ cat }) {
  const [posts, setPosts] = useState([]);
  
  // Get current post ID from URL to exclude it
  const location = useLocation();
  const currentPostId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ALL posts so sidebar is never empty
        const res = await axios.get(`http://localhost:5000/api/posts`);
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
             src={post.img.includes("http") ? post.img : `http://localhost:5000/images/${post.img}`} 
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