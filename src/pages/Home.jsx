import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Un backend URL correct ah iruka nu check panniko
        const res = await axios.get(`http://localhost:5000/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [cat]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
  };

  // HTML content ah Plain Text ah maathura function
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // --- LOADING UI ---
  if (isLoading) {
    return (
      <div style={{
        height: "50vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"
      }}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          style={{
            width: "50px", height: "50px", border: "5px solid lightgray",
            borderTop: "5px solid var(--primary)", borderRadius: "50%"
          }}
        />
        <h3 style={{marginTop: "20px", color: "var(--text-soft)"}}>Loading your awesome content...</h3>
      </div>
    );
  }

  return (
    <motion.div 
      className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* ============================================================
          1. NEW: PORTFOLIO HEADER & SOCIAL LINKS SECTION 
         ============================================================ */}
      <div className="portfolio">
        <motion.div 
          className="header-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>My Creative Portfolio</h1>
          <p>
            Showcasing my journey in <b>MERN Stack</b> & <b>Cloud Architecture</b>
          </p>
          
          {/* Resume Button */}
          <button className="resume-btn" style={{ marginTop: "20px" }}>
            <span style={{ fontSize: "18px" }}>📄</span> Download My Resume
          </button>

          {/* --- SOCIAL LINKS (LinkedIn & GitHub) --- */}
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/in/tamilmani-b-067a7831a/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn linkedin"
            >
              <span>LinkedIn</span>
            </a>

            <a 
              href="https://github.com/TamilManiB2007" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn github"
            >
              <span>GitHub</span>
            </a>
          </div>
          {/* ------------------------------------------- */}
        </motion.div>
      </div>

      {/* ============================================================
          2. EXISTING: BLOG POSTS LIST (Fetched from Backend)
         ============================================================ */}
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
                 src={post.img.includes("http") ? post.img : `http://localhost:5000/images/${post.img}`} 
                 alt="" 
                 whileHover={{ scale: 1.1 }}
                 transition={{ duration: 0.4 }}
               />
              )}
            </div>
            
            <div className="content">
              <Link className="link" to={`/post/${post._id}`}>
                <motion.h1 whileHover={{ color: "var(--primary)", x: 10 }}>
                  {post.title}
                </motion.h1>
              </Link>
              
              <p>{getText(post.desc).substring(0, 200)}...</p>
              
              <Link className="link" to={`/post/${post._id}`}>
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "var(--primary)", color: "#fff" }}
                  whileTap={{ scale: 0.9 }}
                >
                  Read More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
}