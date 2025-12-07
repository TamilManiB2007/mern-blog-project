import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // <--- STOP PAGE REFRESH
    try {
      await login(inputs);
      navigate("/"); // Go to Home
    } catch (err) {
      setError(err.response ? err.response.data : "Login failed!");
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      {/* FIX: Add onSubmit HERE */}
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
          type="password" 
          placeholder="password" 
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {err && <p style={{color:"red"}}>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}