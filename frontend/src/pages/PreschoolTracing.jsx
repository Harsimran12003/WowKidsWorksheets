import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

const API_BASE = "https://wow-kids-worksheets-backend.vercel.app";
const BATCH = 4;

const PreschoolTracing = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);

  // Fetch backend data
  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${API_BASE}/api/worksheets`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          // Load only preschool tracing worksheets
          const filtered = data.worksheets.filter(
            (ws) =>
              ws.category === "preschool" &&
              ws.subCategory.toLowerCase() === "pre-school-tracing"
          );
          setWorksheets(filtered);
        }
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  const displayed = worksheets.slice(0, visible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-yellow-50 to-blue-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 text-center overflow-hidden">
        <motion.div
          className="absolute left-10 top-20 text-5xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🎈
        </motion.div>

        <motion.div
          className="absolute right-20 top-32 text-5xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ⭐
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-pink-600"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Preschool Tracing Worksheets ✏️
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-lg">
          Help little learners practice writing and improve fine motor skills with fun & interactive tracing worksheets!
        </p>
      </section>

      {/* WORKSHEETS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {displayed.map((ws) => (
            <motion.div
              key={ws._id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.35 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl 
                         border-4 border-pink-200 relative p-5 flex flex-col items-center"
            >
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-4 right-4 text-3xl"
              >
                ✨
              </motion.div>

              {/* Preview (supports PDF thumbnails) */}
              <div className="w-full h-44 rounded-2xl bg-white shadow-inner border border-gray-200 p-3 
                              flex items-center justify-center overflow-hidden relative">

                {ws.file.endsWith(".pdf") ? (
                  <iframe
                    src={`${ws.file}#toolbar=0`}
                    className="absolute top-0 left-0 w-[200%] h-[200%] scale-[0.5] origin-top-left pointer-events-none"
                  />
                ) : (
                  <img
                    src={ws.file}
                    alt={ws.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-4 px-2 min-h-[56px]">
                {ws.name}
              </h3>

              {/* Buttons */}
              <div className="mt-auto w-full flex justify-between gap-3 pt-4">
                <button
                  onClick={() => setPreviewData(ws)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 
                             text-white py-2 rounded-full font-semibold shadow-md transition"
                >
                  <FiEye /> View
                </button>

                <a
                  href={ws.file}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 
                             text-white py-2 px-3 rounded-full font-semibold shadow-md transition"
                >
                  <FiDownload /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOAD MORE */}
        {visible < worksheets.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisible((prev) => prev + BATCH)}
              className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full 
                         font-bold shadow-lg text-lg transition"
            >
              Load More ...
            </button>
          </div>
        )}
      </section>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {previewData && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[300]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-3xl w-full shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewData(null)}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-pink-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-pink-600">
                {previewData.name}
              </h2>

              {/* PDF / Image Preview */}
              {previewData.file.endsWith(".pdf") ? (
                <embed
                  src={previewData.file}
                  type="application/pdf"
                  className="w-full h-[70vh] rounded-xl border-2"
                />
              ) : (
                <img
                  src={previewData.file}
                  alt={previewData.name}
                  className="w-full h-[70vh] object-contain rounded-xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default PreschoolTracing;
