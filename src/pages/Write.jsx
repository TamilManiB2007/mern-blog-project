import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';

export default function Write() {
  // Check if we are in "Edit Mode" (passed via state)
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
      await axios.post("http://localhost:5000/api/upload", formData);
      return filename;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    
    // Use new image if selected, otherwise keep old image (if editing)
    if (file) {
      imgUrl = await upload();
    } else {
      imgUrl = state?.img || ""; 
    }

    try {
      // LOGIC: If state exists, it's UPDATE. Else, it's CREATE.
      if (state) {
        await axios.put(`http://localhost:5000/api/posts/${state._id}`, {
          title,
          desc: value,
          cat,
          img: imgUrl,
          username: currentUser.username
        });
        alert("Blog Updated!");
      } else {
        await axios.post(`http://localhost:5000/api/posts`, {
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
          {/* Categories */}
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