import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

// Subject list
const subjects = [
  {
    name: "English",
    route: "/english",
    color: "from-pink-400 to-red-500",
    emoji: "📚",
    img: "./english.png",
  },
  {
    name: "Maths",
    route: "/maths",
    color: "from-blue-400 to-indigo-500",
    emoji: "🔢",
    img: "./maths.png",
  },
  {
    name: "Science",
    route: "/science",
    color: "from-green-400 to-emerald-500",
    emoji: "🔬",
    img: "./science.png",
  },
  {
    name: "Art & Crafts",
    route: "/art-crafts",
    color: "from-yellow-400 to-orange-500",
    emoji: "✂️",
    img: "./art.png",
  },
  {
    name: "Coloring Pages",
    route: "/coloring-pages",
    color: "from-purple-400 to-fuchsia-500",
    emoji: "🎨",
    img: "./coloring.png",
  },
  {
    name: "Puzzles & Games",
    route: "/puzzles-games",
    color: "from-cyan-400 to-sky-500",
    emoji: "🧩",
    img: "./puzzles.png",
  },
];

// Confetti
const handleCardConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const SubjectCardsSection = () => {
  return (
    <section id="subjects" className="py-20 bg-gradient-to-b from-white to-yellow-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-center text-sky-600"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Explore Worksheets ✏️📘
        </motion.h2>

        {/* GRID */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {subjects.map((subject, index) => (
            <Tilt key={index} glareEnable={true} glareMaxOpacity={0.3} scale={1.06} tiltMaxAngleX={15} tiltMaxAngleY={15}>

              <motion.div
                onClick={handleCardConfetti}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`rounded-3xl shadow-[10px_10px_20px_rgba(0,0,0,0.15),_-10px_-10px_20px_rgba(255,255,255,0.8)] bg-gradient-to-br ${subject.color} p-8 cursor-pointer text-center text-white overflow-hidden relative`}
              >

                {/* Cute Badge Icon */}
                <div className="absolute top-4 right-4 bg-white text-pink-600 text-xl px-3 py-1 rounded-full shadow-md">
                  ⭐
                </div>

                {/* Subject Image */}
                <img
                  src={subject.img}
                  alt={subject.name}
                  className="mx-auto w-28 h-28 object-contain drop-shadow-xl rounded-full bg-white p-2 shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                />

                {/* Emoji floating */}
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl my-3"
                >
                  {subject.emoji}
                </motion.span>

                {/* Title */}
                <h3 className="text-3xl font-extrabold">{subject.name}</h3>

                {/* Button */}
               <Link
              to={subject.route}
              className="block mt-6 bg-white text-pink-600 px-5 py-5 rounded-full font-bold shadow-lg hover:bg-yellow-100 transition"
            >
              View All
            </Link> 

              </motion.div>

            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectCardsSection;
