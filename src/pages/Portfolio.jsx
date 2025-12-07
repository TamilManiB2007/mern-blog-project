import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaDownload } from "react-icons/fa"; // <--- Import Icons

export default function Portfolio() {
  // YOUR REAL PROJECTS (Updated with ShoeCart)
  const projects = [
    {
      id: 1,
      title: "University Portal",
      desc: "A full-stack MERN application for student management, attendance tracking, and marks entry. Used for DBMS mini-project.",
      techStack: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/TamilManiB2007/TechTians_6-University", 
      demo: "#", 
      img: "/university-portal.png" // Make sure this file is in client/public
    },
    {
      id: 2,
      title: "ShoeCart E-commerce",
      desc: "A fully functional e-commerce store for footwear. Features include User Authentication, Add to Cart, Product Filtering, and Checkout flow.",
      techStack: ["MERN Stack", "Redux", "Tailwind CSS"],
      github: "https://github.com/TamilManiB2007/shoecart", 
      demo: "#",
      img: "/shoecart.png" 
    },
    {
      id: 3,
      title: "Stock Market Predict Engine",
      desc: "An AI-powered tool to predict stock trends using Python and Machine Learning algorithms. Expanded from a COA mini-project.",
      techStack: ["Python", "Machine Learning", "Pandas"],
      github: "https://github.com/TamilManiB2007/stock-prediction-engine", 
      demo: "#",
      img: "/stock.png"
    }
  ];

  // YOUR CERTIFICATIONS
  const certs = [
    {
      id: 1, // Changed id to 1 (Unique)
      name: "Edify Techno Solutions Internship",
      issuer: "Edify Techno Solutions",
      date: "Oct 2025",
      img: "/internship.jpeg", 
    },
    {
      id: 2,
      name: "Full Stack Course Certificate",
      issuer: "Udemy Course",
      date: "June 2025",
      img: "/udemycer.jpg", 
    },
  ];

  return (
    <div className="portfolio">
      <div className="header-banner">
        <h1>My Creative Portfolio</h1>
        <p>Showcasing my journey in <b>MERN Stack</b> & <b>Cloud Architecture</b></p>
        
        {/* --- ADDED RESUME BUTTON HERE --- */}
        <div style={{ marginTop: "30px" }}>
          <a href="/TamilmaniB_Updated_Resume_Dec25.pdf" download="TamilMani_Resume.pdf">
            <button className="resume-btn">
              <FaDownload /> Download My Resume
            </button>
          </a>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">🚀 Featured Projects</h2>
        <div className="grid">
          {projects.map((project) => (
            <div className="card project-card" key={project.id}>
              <div className="image-box">
                 <img src={project.img} alt={project.title} />
              </div>
              <div className="content-box">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="tech-stack">
                  {project.techStack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="links">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <button className="github"><FaGithub /> GitHub</button>
                  </a>
                  {project.demo !== "#" && (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <button className="demo"><FaExternalLinkAlt /> Live Demo</button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">🏆 Certifications & Experience</h2>
        <div className="grid cert-grid">
          {certs.map((cert) => (
            <div className="card cert-card" key={cert.id}>
              <img src={cert.img} alt={cert.name} />
              <div className="info">
                <h3>{cert.name}</h3>
                <span>{cert.issuer}</span>
                <small>{cert.date}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}