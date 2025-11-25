import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiDownload, FiX } from "react-icons/fi";

const API_BASE = "http://localhost:5000"; // Backend

const BATCH = 4;

/* CARD COMPONENT */
const Card = ({ ws, onView }) => (
  <motion.div
    className="bg-white/50 backdrop-blur-xl rounded-3xl border border-white/40 p-5 shadow-xl 
               shadow-[rgba(0,0,0,0.15)_0px_10px_25px] hover:shadow-[rgba(255,0,128,0.4)_0px_0px_25px] 
               transition-all flex flex-col"
    whileHover={{ scale: 1.06, y: -6 }}
  >
    <div className="relative w-full h-44 bg-white/80 rounded-2xl p-3 shadow-inner overflow-hidden">

      {/* Show PDF preview inside the card (scrollbars hidden) */}
      {ws.file.toLowerCase().endsWith(".pdf") ? (
        <iframe
          src={`${API_BASE}/uploads/worksheets/${ws.file}#toolbar=0&navpanes=0&scrollbar=0`}
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

    <h3 className="mt-4 text-lg font-bold text-gray-800 text-center min-h-[60px]">
      {ws.name}
    </h3>

    {/* BUTTONS */}
    <div className="mt-auto flex gap-3 pt-4">
      <button
        onClick={() => onView(ws)}
        className="flex-1 py-2 rounded-full bg-pink-600 text-white font-semibold 
                   hover:bg-pink-700 shadow-md flex items-center justify-center gap-2"
      >
        <FiEye /> View
      </button>

      <a
        href={`${API_BASE}/uploads/worksheets/${ws.file}`}
        download
        className="flex-1 py-2 px-3 rounded-full bg-green-500 text-white font-semibold 
                   hover:bg-green-600 shadow-md flex items-center justify-center gap-2"
      >
        <FiDownload /> Download
      </a>
    </div>
  </motion.div>
);

export default function Coloring() {
  const [worksheets, setWorksheets] = useState([]);
  const [visible, setVisible] = useState(BATCH);
  const [preview, setPreview] = useState(null);

  // Fetch from backend
  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${API_BASE}/api/worksheets`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          const filtered = data.worksheets.filter(
            (ws) => ws.subCategory === "Coloring"
          );
          setWorksheets(filtered);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  const displayed = worksheets.slice(0, visible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-yellow-50 to-orange-50">
      <Navbar />

      {/* HERO */}
      <header className="relative pt-28 pb-20 text-center overflow-hidden">
        <motion.span
          className="absolute left-10 top-28 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎨
        </motion.span>

        <motion.span
          className="absolute right-12 top-36 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🖍️
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-pink-700"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Coloring Pages ✨
        </motion.h1>

        <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg">
          Fun, printable coloring worksheets for kids to color and enjoy!
        </p>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {displayed.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            No Coloring worksheets found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {displayed.map((ws) => (
              <Card ws={ws} key={ws._id} onView={setPreview} />
            ))}
          </div>
        )}

        {/* LOAD MORE */}
        {visible < worksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() =>
                setVisible((v) => Math.min(worksheets.length, v + BATCH))
              }
              className="px-10 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold shadow-lg"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[300]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-3xl w-full shadow-2xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 text-3xl hover:text-pink-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
                {preview.name}
              </h2>

              <div className="h-[70vh]">
                {preview.file.endsWith(".pdf") ? (
                  <embed
                    src={`${API_BASE}/uploads/worksheets/${preview.file}`}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <img
                    src={`${API_BASE}/uploads/worksheets/${preview.file}`}
                    className="w-full h-full object-contain rounded-xl"
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
