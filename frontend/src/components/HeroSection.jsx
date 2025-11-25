import React from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import confetti from "canvas-confetti";

const handleConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.7 },
  });
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-100 via-yellow-100 to-sky-100 pt-20 pb-40 lg:pb-60 z-[1]">
      
      {/* FLOATING DECORATIONS */}
      <FloatingDecor />

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 relative z-[10]">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <h1
            className="text-5xl lg:text-7xl font-extrabold leading-tight"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Online Worksheets
            <span className="block text-pink-600 mt-1">For Kids 🎨✨</span>
          </h1>

          <p className="mt-4 text-gray-700 text-lg max-w-xl">
            Printable & interactive worksheets designed to boost creativity,
            imagination, and joyful learning for little minds 🌈
          </p>

          {/* BUTTON */}
          <div className="mt-6 flex gap-4">
            <motion.button
  onClick={() => {
    handleConfetti();
    const el = document.getElementById("subjects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }}
  whileHover={{ scale: 1.1 }}
  className="px-8 py-4 bg-pink-600 text-white rounded-full text-lg font-semibold shadow-2xl border-4 border-white cursor-pointer hover:bg-pink-700 flex items-center gap-2"
>
  🎉 Explore Worksheets
</motion.button>

          </div>
        </motion.div>

        {/* RIGHT — VIDEO + ROTATING BACKDROP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ rotateY: 12, rotateX: -10 }}
          className="relative flex justify-center w-full lg:w-1/2 z-[15]"
        >
          {/* Rotating SVG Background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute w-[400px] h-[400px] -z-10 opacity-30"
          >
            <img src="/rotating-crayon.png" alt="rotating background" />
          </motion.div>

          <motion.video
            src="/Cartoon_Character.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-[520px] max-w-full rounded-[40px] border-8 border-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </motion.div>
      </div>

      {/* WAVE SVG BOTTOM */}
      <svg
        className="absolute bottom-0 left-0 w-full z-[5] pointer-events-none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,69.3C672,64,768,64,864,64C960,64,1056,64,1152,80C1248,96,1344,128,1392,144L1440,160L1440,320L0,320Z"
        />
      </svg>
    </section>
  );
};

/* FLOATING DECORATIONS */
const FloatingDecor = () => {
  const float = { y: [0, -18, 0] };
  return (
    <>
      <motion.div className="absolute top-20 left-16 text-5xl" animate={float} transition={{ repeat: Infinity, duration: 3 }}>
        🎈
      </motion.div>
      <motion.div className="absolute top-10 right-24 text-5xl" animate={float} transition={{ repeat: Infinity, duration: 2.4 }}>
        ⭐
      </motion.div>
      <motion.div className="absolute bottom-28 left-24 text-5xl" animate={float} transition={{ repeat: Infinity, duration: 2.6 }}>
        🌟
      </motion.div>
      <motion.div className="absolute bottom-16 right-10 text-5xl" animate={float} transition={{ repeat: Infinity, duration: 2.8 }}>
        🖍️
      </motion.div>
    </>
  );
};

export default HeroSection;
