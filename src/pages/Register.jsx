import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    e.preventDefault(); // <--- STOP PAGE REFRESH (Critical)
    try {
      // NOTE: Ensure your Backend is running on port 5000
      await axios.post("http://localhost:5000/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      // If server is off or error, show it here
      setError(err.response ? err.response.data : "Server not connected!");
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      {/* FIX: Add onSubmit HERE, not on the button */}
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
        {/* FIX: Button just says "submit", Form handles the rest */}
        <button type="submit">Register</button>
        
        {err && <p style={{color:"red"}}>{err}</p>}
        
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}