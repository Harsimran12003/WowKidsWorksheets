import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ScrollToTopRocket = () => {
  const [visible, setVisible] = useState(false);

  // Trigger visibility when scrolled
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top animation
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-[999] group cursor-pointer"
        >
          {/* Rocket Icon */}
          <motion.div
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gradient-to-b from-red-500 to-orange-400 shadow-2xl"
          >
            <span className="text-3xl">🚀</span>
          </motion.div>

          {/* Fire animation */}
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.9, 1.4, 0.9] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0"
          >
            <span className="text-yellow-300 text-2xl">🔥</span>
          </motion.div>
        </motion.button>
      )}
    </>
  );
};

export default ScrollToTopRocket;
