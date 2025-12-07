import React, { useState, useContext } from 'react'; // Removed unused useEffect
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import API from "../api"; // <-- Import API

export default function Write() {
  const state = useLocation().state;
  
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const upload = async () => {
    try {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      
      // --- CHANGE: API.post for upload ---
      await API.post("/upload", formData);
      return filename;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    
    if (file) {
      imgUrl = await upload();
    } else {
      imgUrl = state?.img || ""; 
    }

    try {
      if (state) {
        // --- CHANGE: API.put for Update ---
        await API.put(`/posts/${state._id}`, {
          title,
          desc: value,
          cat,
          img: imgUrl,
          username: currentUser.username
        });
        alert("Blog Updated!");
      } else {
        // --- CHANGE: API.post for Create ---
        await API.post(`/posts`, {
          title,
          desc: value,
          cat,
          img: imgUrl,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          username: currentUser.username
        });
        alert("Blog Published!");
      }
      
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error!");
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input 
          type="text" 
          value={title} 
          placeholder="Title" 
          onChange={e => setTitle(e.target.value)} 
        />
        <div className="editorContainer">
          <textarea 
            className="editor" 
            value={value}
            placeholder="Write your amazing blog here..."
            onChange={e => setValue(e.target.value)}
            style={{ width: "100%", height: "100%", padding: "10px", border: "none", outline: "none" }}
          ></textarea>
        </div>
      </div>
      
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span><b>Status: </b> {state ? "Editing" : "Draft"}</span>
          <span><b>Visibility: </b> Public</span>
          
          <input style={{ display: "none" }} type="file" id="file" onChange={e => setFile(e.target.files[0])} />
          <label className="file" htmlFor="file">
            {file ? "New Image Selected" : "Upload/Change Image"}
          </label>
          
          <div className="buttons">
            <button>Save Draft</button>
            <button onClick={handleClick}>
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "projects"} name="cat" value="projects" id="projects" onChange={e => setCat(e.target.value)} />
            <label htmlFor="projects">Projects</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={e => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e => setCat(e.target.value)} />
            <label htmlFor="design">Design</label>
          </div>
        </div>
      </div>
    </div>
  );
}