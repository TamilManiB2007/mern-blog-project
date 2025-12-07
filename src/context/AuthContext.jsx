import { createContext, useEffect, useState } from "react";
// import axios from "axios";  <-- Ithu ippo theva illa, remove pannidalam!
import API from "../api";     // <-- Namma create panna API file

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    // OLD LINE: 
    // const res = await axios.post("http://localhost:5000/api/auth/login", inputs);
    
    // NEW LINE (Simpler & Correct):
    const res = await API.post("/auth/login", inputs); 
    
    setCurrentUser(res.data);
  };

  const logout = async () => {
    // Oru vela un backend la logout route iruntha, ingayum API.post("/auth/logout") podalam.
    // Illana just state clear panrathu pothum.
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};