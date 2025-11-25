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

/* CARD COMPONENT */
const Card = ({ ws, onView }) => (
  <motion.div
    whileHover={{ scale: 1.06, y: -6 }}
    className="bg-white/25 backdrop-blur-xl rounded-3xl border border-white/40 p-5 
               shadow-xl shadow-[rgba(0,0,0,0.15)_0px_8px_24px]
               hover:shadow-[rgba(0,180,255,0.35)_0px_0px_25px]
               transition-all flex flex-col"
  >
    <div className="w-full h-44 rounded-2xl bg-white/70 border border-white/20 p-3 flex items-center justify-center overflow-hidden">
      <img src={ws.img} alt={ws.title} className="w-full h-full object-contain" />
    </div>

    <h3 className="mt-4 text-lg font-bold text-gray-800 text-center min-h-[60px]">
      {ws.title}
    </h3>

    <div className="mt-auto w-full flex gap-3 pt-4">
      <button
        onClick={() => onView(ws)}
        className="flex-1 bg-cyan-600 text-white py-2 rounded-full shadow-md hover:bg-cyan-700 hover:scale-105 flex items-center justify-center gap-2 transition"
      >
        <FiEye /> View
      </button>

      <a
        href={ws.pdf}
        download
        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-full shadow-md hover:bg-green-600 hover:scale-105 flex items-center justify-center gap-2 transition"
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
    window.scrollTo(0, 0); // Always load from top
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-50 to-indigo-50">
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative pt-28 pb-20 text-center overflow-hidden">

        {/* Floating math emojis */}
        <motion.span
          className="absolute left-10 top-20 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🔢
        </motion.span>

        <motion.span
          className="absolute right-10 top-28 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          📐
        </motion.span>

        <motion.span
          className="absolute left-1/2 bottom-6 text-6xl opacity-30 pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ➗
        </motion.span>

                <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-cyan-700"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Maths Worksheets
        </motion.h1>

        <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
          Fun number drills, shapes, counting, measurement & early problem solving!
        </p>
      </header>

      {/* GRID SECTION */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {worksheets.slice(0, visible).map((ws, i) => (
            <Card key={i} ws={ws} onView={setPreview} />
          ))}
        </div>

        {visible < worksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible(v => Math.min(worksheets.length, v + BATCH))}
              className="px-10 py-3 bg-cyan-700 text-white rounded-full shadow-lg hover:bg-cyan-800 transition text-lg"
            >
              Load More ...
            </button>
          </div>
        )}
      </main>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-3xl w-full shadow-2xl relative"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 text-3xl hover:text-cyan-700"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-cyan-700">
                {preview.title}
              </h2>

              <div className="w-full h-[70vh]">
                {preview.pdf.endsWith(".pdf") ? (
                  <embed
                    src={preview.pdf}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <img
                    src={preview.img}
                    className="w-full h-full rounded-xl object-contain"
                    alt={preview.title}
                  />
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
