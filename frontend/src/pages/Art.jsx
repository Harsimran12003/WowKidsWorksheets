import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiDownload, FiX } from "react-icons/fi";

const API_BASE = "https://wow-kids-worksheets-backend.vercel.app"; // LOCAL BACKEND

const BATCH = 4;

// ✨ Card Component
const Card = ({ ws, onView }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -6 }}
    transition={{ duration: 0.25 }}
    className="rounded-3xl bg-gradient-to-br from-orange-200/40 to-pink-200/40 backdrop-blur-xl 
               border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.15)] p-5 flex flex-col"
  >
        <div className="relative w-full h-44 rounded-2xl bg-white/70 overflow-hidden shadow-inner">
  {ws.file.endsWith(".pdf") ? (
    <iframe
      src={`${ws.file}#toolbar=0&navpanes=0&scrollbar=0`}
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



    <h3 className="text-lg font-bold text-gray-800 text-center mt-4 min-h-[60px]">
      {ws.name}
    </h3>

    {/* BUTTONS */}
    <div className="mt-auto flex gap-3 pt-4">
      <button
        onClick={() => onView(ws)}
        className="flex-1 py-2 rounded-full bg-orange-500 hover:bg-orange-600 
                   text-white font-semibold shadow flex items-center justify-center gap-2"
      >
        <FiEye /> View
      </button>

      <a
        href={ws.file}
        download
        className="flex-1 py-2 px-3 rounded-full bg-green-500 hover:bg-green-600 
                   text-white font-semibold shadow flex items-center justify-center gap-2"
      >
        <FiDownload /> Download
      </a>
    </div>
  </motion.div>
);

export default function Art() {
  const [allArtWorksheets, setAllArtWorksheets] = useState([]);
  const [visible, setVisible] = useState(BATCH);
  const [preview, setPreview] = useState(null);

  // Fetch from backend
  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${API_BASE}/api/worksheets/`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          // Filter only "Art-Crafts"
          const filtered = data.worksheets.filter(
            (ws) => ws.subCategory === "Art-Crafts"
          );
          setAllArtWorksheets(filtered);
        }
      })
      .catch((e) => console.error("Error fetching data:", e));
  }, []);

  const displayed = allArtWorksheets.slice(0, visible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-orange-50">
      <Navbar />

      {/* HERO */}
      <header className="relative pt-28 pb-20 text-center">
        <motion.span
          className="absolute left-10 top-32 text-6xl opacity-20 pointer-events-none"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🎨
        </motion.span>

        <motion.span
          className="absolute right-12 top-40 text-6xl opacity-20 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ✂️
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-orange-700"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Art & Crafts Worksheets ✨
        </motion.h1>

        <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg">
          Fun, creative worksheets to cut, color, fold, design & explore imagination!
        </p>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {displayed.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            No Art & Crafts worksheets found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {displayed.map((ws) => (
              <Card ws={ws} key={ws._id} onView={setPreview} />
            ))}
          </div>
        )}

        {/* LOAD MORE */}
        {visible < allArtWorksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((v) => Math.min(allArtWorksheets.length, v + BATCH))}
              className="px-10 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full shadow-lg"
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
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-6 max-w-3xl w-full relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 text-3xl hover:text-orange-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center text-orange-700 mb-4">
                {preview.name}
              </h2>

              <div className="h-[70vh]">
                {preview.file.endsWith(".pdf") ? (
                  <embed
                    src={preview.file}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <img
                    src={preview.file}
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
