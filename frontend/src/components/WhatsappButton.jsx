import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px (adjust if needed)
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {show && (
        <motion.a
          href="https://wa.me/919855676503?text=Hello%20WowKids%20Worksheets!%20I%20need%20some%20help."
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 fixed bottom-24 right-6 z-[80] w-15 h-14 rounded-full
                      bg-green-500 shadow-xl flex items-center justify-center
                      text-white text-3xl cursor-pointer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          style={{ boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)" }}
        >
          <FaWhatsapp />
        </motion.a>
      )}
    </>
  );
}
