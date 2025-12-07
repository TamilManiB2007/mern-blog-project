import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import axios from "axios";  <-- Ithu theva illa, remove pannidu
import { motion } from "framer-motion";
import API from "../api"; // <-- Correct import ✅

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const cat = useLocation().search;

  // IMAGE URL (Render Backend URL)
  // Inga unnoda backend link podu, apo thaan images load aagum
  const PF = "https://tamilmaniblog-backend.onrender.com/images/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- CHANGE 1: Using API instance instead of axios ---
        // Old: const res = await axios.get(`http://localhost:5000/api/posts${cat}`);
        
        // New:
        const res = await API.get(`/posts${cat}`); 
        
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [cat]);

  // ... (Animation Variants code same thaan) ...
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // ... (Loading UI code same thaan) ...
  if (isLoading) {
      // ... same loading code ...
      return <div>Loading...</div>; // (Shortened for verify)
  }

  return (
    <motion.div 
      className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Portfolio Section same thaan... */}
      
      <div className="posts">
        {posts.map((post) => (
          <motion.div 
            className="post" 
            key={post._id} 
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
          >
            <div className="img">
              {post.img && (
                 <motion.img 
                 // --- CHANGE 2: Image Source Fix ---
                 // Old: src={post.img.includes("http") ? post.img : `http://localhost:5000/images/${post.img}`}
                 
                 // New: Use the PF variable we created above
                 src={post.img.includes("http") ? post.img : PF + post.img} 
                 
                 alt="" 
                 whileHover={{ scale: 1.1 }}
                 transition={{ duration: 0.4 }}
               />
              )}
            </div>
            
            {/* Content section same thaan... */}
             <div className="content">
              <Link className="link" to={`/post/${post._id}`}>
                <motion.h1 whileHover={{ color: "var(--primary)", x: 10 }}>
                  {post.title}
                </motion.h1>
              </Link>
              <p>{getText(post.desc).substring(0, 200)}...</p>
              <Link className="link" to={`/post/${post._id}`}>
                <motion.button whileHover={{ scale: 1.1 }}>Read More</motion.button>
              </Link>
            </div>

          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}