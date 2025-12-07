import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext"; // <--- Import AuthContext
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaPenNib } from "react-icons/fa";
import API from "../api";
export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser, logout } = useContext(AuthContext); // <--- Get User & Logout function

  return (
    <motion.div 
      className="navbar"
      initial={{ y: -100 }} 
      animate={{ y: 0 }}    
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="logo">
          <Link to="/">
             <h2>Tamil Mani's Blog</h2>
          </Link>
        </div>
        
        <div className="links">
          <Link className="link" to="/"><h6>HOME</h6></Link>
          <Link className="link" to="/portfolio"><h6>PROJECTS</h6></Link>
          
          <Link className="link" to="/write">
            <span className="write-btn">
              <FaPenNib />
            </span>
          </Link>

          {/* LOGIC: If User is Logged In -> Show Name & Logout. Else -> Show Login */}
          {currentUser ? (
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <span style={{ fontWeight: "bold", color: "var(--primary)" }}>
                {currentUser.username}
              </span>
              <span onClick={logout} style={{ cursor: "pointer", fontWeight: "bold", color: "tomato" }}>
                Logout
              </span>
            </div>
          ) : (
            <Link className="link" to="/login"><h6>Login</h6></Link>
          )}

          {/* Dark Mode Toggle */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}