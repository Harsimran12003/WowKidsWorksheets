import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiDownload, FiX } from "react-icons/fi";

const API_BASE = "http://localhost:5000";
const BATCH = 4;

/* CARD COMPONENT */
const PuzzleCard = ({ ws, onView }) => (
  <motion.div
    whileHover={{ scale: 1.06, y: -6 }}
    className="bg-white/25 backdrop-blur-xl rounded-3xl border border-white/40 
               p-5 shadow-xl shadow-[rgba(0,0,0,0.15)_0px_8px_24px]
               hover:shadow-[rgba(120,70,255,0.35)_0px_0px_25px]
               transition-all"
  >
    <div className="w-full h-44 rounded-2xl bg-white/70 border border-white/20 p-3 
                    flex items-center justify-center overflow-hidden relative">

      {/* PDF or Image thumbnail inside card */}
      {ws.file.endsWith(".pdf") ? (
        <iframe
          src={`${API_BASE}/uploads/worksheets/${ws.file}#toolbar=0`}
          className="absolute top-0 left-0 w-[200%] h-[200%] scale-[0.5] origin-top-left pointer-events-none"
        />
      ) : (
        <img
          src={`${API_BASE}/uploads/worksheets/${ws.file}`}
          alt={ws.name}
          className="w-full h-full object-contain"
        />
      )}
    </div>

    <h3 className="mt-4 text-lg font-bold text-gray-700 text-center min-h-[60px]">
      {ws.name}
    </h3>

    <div className="mt-auto w-full flex gap-3 pt-4">
      <button
        onClick={() => onView(ws)}
        className="flex-1 bg-purple-600 text-white py-2 rounded-full shadow-md 
                   hover:bg-purple-700 hover:scale-105 transition flex items-center justify-center gap-2"
      >
        <FiEye /> View
      </button>

      <a
        href={`${API_BASE}/uploads/worksheets/${ws.file}`}
        download
        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-full shadow-md 
                   hover:bg-green-600 hover:scale-105 transition flex items-center justify-center gap-2"
      >
        <FiDownload /> Download
      </a>
    </div>
  </motion.div>
);

export default function Puzzles() {
  const [worksheets, setWorksheets] = useState([]);
  const [visible, setVisible] = useState(BATCH);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${API_BASE}/api/worksheets`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          const filtered = data.worksheets.filter(
            (ws) =>
              ws.subCategory === "Puzzles" &&
              ws.subCategory.toLowerCase() === "puzzles"
          );
          setWorksheets(filtered);
        }
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  const displayed = worksheets.slice(0, visible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-sky-50 to-indigo-50">
      <Navbar />

      {/* HERO */}
      <header className="relative pt-28 pb-20 text-center overflow-hidden">
        {/* Floating emojis */}
        <motion.span
          className="absolute left-10 top-20 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🧩
        </motion.span>

        <motion.span
          className="absolute right-12 top-28 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🎮
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-purple-700"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Puzzles & Games
        </motion.h1>

        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Mazes, logic puzzles, spot-difference challenges & fun brain boosters!
        </p>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {displayed.map((ws) => (
            <PuzzleCard key={ws._id} ws={ws} onView={setPreview} />
          ))}
        </div>

        {visible < worksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((v) => v + BATCH)}
              className="px-10 py-3 bg-purple-700 text-white rounded-full shadow-lg 
                         hover:bg-purple-800 transition text-lg"
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
                className="absolute top-4 right-4 text-3xl hover:text-purple-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">
                {preview.name}
              </h2>

              <div className="w-full h-[70vh]">
                {preview.file.endsWith(".pdf") ? (
                  <embed
                    src={`${API_BASE}/uploads/worksheets/${preview.file}`}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <img
                    src={`${API_BASE}/uploads/worksheets/${preview.file}`}
                    className="w-full h-full rounded-xl object-contain"
                    alt="preview"
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
