import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api"; // <-- Import our API file

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [err, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      // --- CHANGE: Use API instead of axios ---
      await API.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response ? err.response.data : "Server not connected!");
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
          required 
          type="text" 
          placeholder="username" 
          name="username" 
          onChange={handleChange} 
        />
        <input 
          required 
          type="email" 
          placeholder="email" 
          name="email" 
          onChange={handleChange} 
        />
        <input 
          required 
          type="password" 
          placeholder="password" 
          name="password" 
          onChange={handleChange} 
        />
        <button type="submit">Register</button>
        
        {err && <p style={{color:"red"}}>{err}</p>}
        
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}