import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiDownload, FiX } from "react-icons/fi";

const API_BASE = "https://wow-kids-worksheets-backend.vercel.app";
const BATCH = 4;

/* CARD COMPONENT */
const Card = ({ ws, onView }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -6 }}
    className="bg-white/30 backdrop-blur-xl rounded-3xl border border-white/40
               p-5 shadow-xl shadow-[rgba(0,0,0,0.15)_0px_10px_25px]
               hover:shadow-[rgba(0,180,255,0.35)_0px_0px_25px]"
  >
    <div className="w-full h-44 rounded-2xl bg-white/70 border border-white/30 p-3 
                    flex items-center justify-center shadow-inner overflow-hidden relative">
      
      {/* PDF Thumbnail */}
      {ws.file.endsWith(".pdf") ? (
        <iframe
          src={`${ws.file}#toolbar=0`}
          className="absolute top-0 left-0 w-[200%] h-[200%] scale-[0.5] origin-top-left pointer-events-none"
        />
      ) : (
        <img
          src={ws.file}
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
        className="flex-1 bg-cyan-600 text-white py-2 rounded-full shadow-md 
                   hover:bg-cyan-700 hover:scale-105 transition 
                   flex items-center justify-center gap-2"
      >
        <FiEye /> View
      </button>

      <a
        href={ws.file}
        download
        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-full shadow-md 
                   hover:bg-green-600 hover:scale-105 transition 
                   flex items-center justify-center gap-2"
      >
        <FiDownload /> Download
      </a>
    </div>
  </motion.div>
);

export default function Maths() {
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
            (ws) => ws.subCategory === "Maths" || ws.subCategory === "maths"
          );
          setWorksheets(filtered);
        }
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const displayed = worksheets.slice(0, visible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-purple-50">
      <Navbar />

      {/* HERO */}
      <header className="relative pt-28 pb-20 text-center overflow-hidden">
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
        {displayed.length === 0 ? (
          <p className="text-center text-gray-700 text-lg mt-10">No Maths worksheets found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {displayed.map((ws) => (
              <Card key={ws._id} ws={ws} onView={setPreview} />
            ))}
          </div>
        )}

        {visible < worksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((v) => v + BATCH)}
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
                {preview.name}
              </h2>

              <div className="w-full h-[70vh]">
                {preview.file.endsWith(".pdf") ? (
                  <embed
                    src={preview.file}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <img
                    src={preview.file}
                    className="w-full h-full rounded-xl object-contain"
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
