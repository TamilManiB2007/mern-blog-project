import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // Cursor size 30px. So half size (15px) is the offset for perfect center.
  const cursorOffset = -15; 

  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className="cursor-dot" 
      // Centering logic is handled here (JS) for stability
      animate={{ 
        x: position.x + cursorOffset, 
        y: position.y + cursorOffset 
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
};
export default Cursor;