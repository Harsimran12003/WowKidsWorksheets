import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

const API_BASE = "http://localhost:5000";
const BATCH = 4;

const PreschoolMaths = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${API_BASE}/api/worksheets`)
      .then(res => res.json())
      .then(data => {
        if (data?.success) {
          const filtered = data.worksheets.filter(
            ws =>
              ws.category === "preschool" &&
              ws.subCategory.toLowerCase() === "maths"
          );
          setWorksheets(filtered);
        }
      })
      .catch(err => console.log("Error loading:", err));
  }, []);

  const displayed = worksheets.slice(0, visible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-blue-50 to-pink-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 overflow-hidden">

        {/* Icons */}
        <motion.span
          className="absolute right-10 md:right-24 top-28 text-5xl opacity-60 pointer-events-none"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ➕
        </motion.span>

        <motion.span
          className="absolute left-12 md:left-32 bottom-16 text-5xl opacity-60 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🔺
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-5xl md:text-6xl font-extrabold text-yellow-600"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Preschool Maths Worksheets 🔢✨
        </motion.h1>

        <p className="mt-4 text-center max-w-2xl mx-auto text-gray-700 text-lg">
          Build strong number sense, shape recognition & early counting skills.
        </p>
      </section>

      {/* WORKSHEET GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">

          {displayed.map(ws => (
            <motion.div
              key={ws._id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative bg-white rounded-3xl shadow-xl
                         border-4 border-yellow-300 p-5 flex flex-col items-center"
            >
              {/* Badge */}
              <div className="absolute -top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md font-bold text-sm">
                123
              </div>

              {/* Thumbnail Preview */}
              <div className="w-full h-44 bg-white shadow-inner border p-3 rounded-xl flex justify-center items-center overflow-hidden relative">

                {ws.file.endsWith(".pdf") ? (
                  <iframe
                    src={`${ws.file}#toolbar=0`}
                    className="absolute top-0 left-0 w-[200%] h-[200%] scale-[0.5] origin-top-left pointer-events-none"
                  />
                ) : (
                  <img
                    src={ws.file}
                    alt={ws.name}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                )}

              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-4 min-h-[60px]">
                {ws.name}
              </h3>

              {/* Buttons */}
              <div className="mt-auto w-full flex gap-3 pt-4">
                <button
                  onClick={() => setPreviewData(ws)}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white py-2 rounded-full shadow-md hover:bg-yellow-600"
                >
                  <FiEye /> View
                </button>

                <a
                  href={ws.file}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-3 rounded-full shadow-md hover:bg-green-600"
                >
                  <FiDownload /> Download
                </a>
              </div>
            </motion.div>
          ))}

        </div>

        {/* LOAD MORE */}
        {visible < worksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible(prev => prev + BATCH)}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold text-lg shadow-lg"
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
              <button
                onClick={() => setPreviewData(null)}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-yellow-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-yellow-600">
                {previewData.name}
              </h2>

              {previewData.file.endsWith(".pdf") ? (
                <embed
                  src={previewData.file}
                  type="application/pdf"
                  className="w-full h-[70vh] rounded-xl"
                />
              ) : (
                <img
                  src={previewData.file}
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

export default PreschoolMaths;
