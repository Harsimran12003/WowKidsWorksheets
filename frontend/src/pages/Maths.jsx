import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiDownload, FiX } from "react-icons/fi";


const worksheets = [
  { title: "Addition Practice", img: "/worksheets/maths/add.png", pdf: "/worksheets/maths/add.pdf" },
  { title: "Subtraction Practice", img: "/worksheets/maths/sub.png", pdf: "/worksheets/maths/sub.pdf" },
  { title: "Place Value", img: "/worksheets/maths/place-value.png", pdf: "/worksheets/maths/place-value.pdf" },
  { title: "Odd & Even", img: "/worksheets/maths/odd-even.png", pdf: "/worksheets/maths/odd-even.pdf" },
  { title: "Shapes", img: "/worksheets/maths/shapes.png", pdf: "/worksheets/maths/shapes.pdf" },
  { title: "Measurement", img: "/worksheets/maths/measure.png", pdf: "/worksheets/maths/measure.pdf" },
];

const BATCH = 4;

/* CARD */
const Card = ({ ws, onView }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -6 }}
    className="bg-white/30 backdrop-blur-xl rounded-3xl border border-white/40
               p-5 shadow-xl shadow-[rgba(0,0,0,0.15)_0px_10px_25px]
               hover:shadow-[rgba(0,180,255,0.35)_0px_0px_25px]"
  >
    <div className="w-full h-44 rounded-2xl bg-white/70 border border-white/30 p-3 
                    flex items-center justify-center shadow-inner overflow-hidden">
      <img src={ws.img} alt={ws.title} className="w-full h-full object-contain" />
    </div>

    <h3 className="mt-4 text-lg font-bold text-gray-700 text-center min-h-[60px]">
      {ws.title}
    </h3>

    <div className="mt-auto w-full flex gap-3 pt-4">
      <button
        onClick={() => onView(ws)}
        className="flex-1 bg-cyan-600 text-white py-2 rounded-full shadow-md 
                   hover:bg-cyan-700 hover:scale-105 transition flex items-center justify-center gap-2"
      >
        <FiEye /> View
      </button>

      <a
        href={ws.pdf}
        download
        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-full shadow-md 
                   hover:bg-green-600 hover:scale-105 transition flex items-center justify-center gap-2"
      >
        <FiDownload /> Download
      </a>
    </div>
  </motion.div>
);

export default function Maths() {
  const [visible, setVisible] = useState(BATCH);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-purple-50">
      <Navbar />

      {/* HERO */}
      <header className="relative pt-28 pb-20 text-center overflow-hidden">

        {/* Floating icons */}
        <motion.span
          className="absolute left-10 top-24 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🔢
        </motion.span>

        <motion.span
          className="absolute right-10 top-28 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ➕
        </motion.span>

        

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-cyan-700"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Maths Worksheets
        </motion.h1>

        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Hands-on number practice, mental math, geometry and measurement fun!
        </p>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {worksheets.slice(0, visible).map((ws, index) => (
            <Card key={index} ws={ws} onView={setPreview} />
          ))}
        </div>

        {visible < worksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible(v => Math.min(worksheets.length, v + BATCH))}
              className="px-10 py-3 bg-cyan-600 text-white rounded-full shadow-lg 
                         hover:bg-cyan-700 transition text-lg"
            >
              Load More ...
            </button>
          </div>
        )}
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-3xl w-full relative shadow-2xl"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 text-3xl hover:text-cyan-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-cyan-700">
                {preview.title}
              </h2>

              <div className="w-full h-[70vh]">
                {preview.pdf.endsWith(".pdf") ? (
                  <embed src={preview.pdf} type="application/pdf" className="w-full h-full rounded-xl" />
                ) : (
                  <img src={preview.img} className="w-full h-full rounded-xl object-contain" />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
