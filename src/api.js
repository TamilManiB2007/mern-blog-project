// src/api.js
import axios from "axios";

// Inga unnoda Render URL ah podu
const API = axios.create({
  baseURL: "https://tamilmaniblog-backend.onrender.com/api", 
});

export default API;