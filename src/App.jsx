import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Portfolio from "./pages/Portfolio";
// import Cursor from "./components/Cursor"; // <--- Import Cursor

function App() {
  return (
    <div className="app">
      {/* 1. MAGIC CURSOR */}
      <Cursor />

      {/* 2. FLOATING BACKGROUND BLOBS */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/write" element={<Write />} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;