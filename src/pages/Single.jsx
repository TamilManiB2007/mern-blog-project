import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Single() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get Post ID from URL
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  // 1. FETCH POST DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  // 2. DELETE FUNCTION
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Scroll Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="single">
      {/* Neon Progress Bar at Top */}
      <motion.div style={{ scaleX, position: "fixed", top: 0, left: 0, right: 0, height: "5px", background: "var(--primary)", transformOrigin: "0%", zIndex: 999 }} />

      <div className="content">
        {/* Dynamic Image Display */}
        {post.img && (
           <motion.img 
           src={post.img.includes("http") ? post.img : `http://localhost:5000/images/${post.img}`} 
           alt="" 
           initial={{ opacity: 0, scale: 1.2 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
         />
        )}
        
        {/* USER SECTION (Your Photo + Date) */}
        <div className="user">
          <img
            src={
              // CHECK: If author is YOU, show your photo. Else, show avatar.
              post.username === "Tamilmani" 
              ? "/My-Photo.jpeg" 
              : post.username 
                ? `https://ui-avatars.com/api/?name=${post.username}&background=random&color=fff&bold=true`
                : "https://ui-avatars.com/api/?name=User&background=random"
            }
            alt=""
            style={{ objectFit: "cover", borderRadius: "50%" }} 
          />
          
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {post.createdAt ? moment(post.createdAt).fromNow() : "just now"}</p>
          </div>

          {/* Edit/Delete Buttons (Only if owner) */}
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${post._id}`} state={post}>
                <button className="editBtn"><FaEdit /></button>
              </Link>
              <button onClick={handleDelete} className="deleteBtn"><FaTrash /></button>
            </div>
          )}
        </div>

        {/* POST TITLE */}
        <motion.h1 initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {post.title}
        </motion.h1>
        
        {/* POST CONTENT */}
        <motion.div 
          className="text-content" 
          initial={{ y: 50, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          dangerouslySetInnerHTML={{
            __html: post.desc, 
          }}
        />
      </div>
      
      {/* Sidebar Menu */}
      <Menu cat={post.cat} />
    </div>
  );
}