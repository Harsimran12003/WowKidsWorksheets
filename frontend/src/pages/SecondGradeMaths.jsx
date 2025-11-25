import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";

const API_BASE = "http://localhost:5000";
const BATCH = 4;

export default function SecondGradeMaths() {
  const [worksheets, setWorksheets] = useState([]);
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${API_BASE}/api/worksheets`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          const filtered = data.worksheets.filter(
            (ws) =>
              (ws.category === "2nd-grade" || ws.category === "2nd Grade") &&
              (ws.subCategory === "Maths" || ws.subCategory === "maths")
          );
          setWorksheets(filtered);
        }
      })
      .catch((err) => console.error("Error fetching worksheets:", err));
  }, []);

  const displayed = worksheets.slice(0, visible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-teal-50">
      <Navbar />

      {/* HERO */}
      <header className="relative pt-28 pb-20 text-center overflow-hidden">
        <motion.span
          className="absolute left-10 top-24 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ➕
        </motion.span>

        <motion.span
          className="absolute right-12 top-28 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ➖
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-cyan-700 leading-snug"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          2nd Grade Maths Worksheets ✨
        </motion.h1>

        <p className="text-gray-700 text-lg mt-4 max-w-2xl mx-auto">
          Master addition, subtraction, place value, geometry, measurement & more
          with fun and interactive maths worksheets!
        </p>
      </header>

      {/* WORKSHEET GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {displayed.length === 0 ? (
          <p className="text-center text-gray-700 text-lg mt-10">
            No worksheets found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {displayed.map((ws) => (
              <motion.div
                key={ws._id}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -6 }}
                transition={{ duration: 0.35 }}
                className="relative bg-white rounded-3xl shadow-xl border-4 border-cyan-200 p-5 flex flex-col"
              >
                <div className="absolute -top-4 left-4 bg-cyan-600 text-white px-3 py-1 rounded-lg shadow font-bold text-sm">
                  MATH
                </div>

                {/* Thumbnail */}
                <div className="w-full h-44 rounded-xl bg-white shadow-inner border p-3 flex items-center justify-center overflow-hidden relative">
                    {ws.file && ws.file.toLowerCase().endsWith(".pdf") ? (
                      <iframe
                        src={`${ws.file}#toolbar=0&scrollbar=0`}
                        className="absolute top-0 left-0 w-[200%] h-[200%] scale-[0.5] origin-top-left pointer-events-none"
                      />
                    ) : ws.file ? (
                      <img
                        src={ws.file}
                        alt={ws.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400">No preview</div>
                    )}
                  </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-4 min-h-[60px]">
                  {ws.name}
                </h3>

                {/* Buttons */}
                <div className="mt-auto flex gap-3 pt-4">
                  <button
                    onClick={() => setPreviewData(ws)}
                    className="flex-1 bg-cyan-500 text-white py-2 rounded-full shadow hover:bg-cyan-600 flex items-center justify-center gap-2"
                  >
                    <FiEye /> View
                  </button>

                  <a
                    href={ws.file}
                    download
                    className="flex-1 bg-green-500 text-white py-2 px-3 rounded-full shadow hover:bg-green-600 flex items-center justify-center gap-2"
                  >
                    <FiDownload /> Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* LOAD MORE */}
        {visible < worksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((prev) => prev + BATCH)}
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-bold shadow-lg text-lg"
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
              className="bg-white rounded-3xl p-6 max-w-3xl w-full shadow-2xl relative"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
            >
              <button
                onClick={() => setPreviewData(null)}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-cyan-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-cyan-700">
                {previewData.name}
              </h2>

              {previewData.file.endsWith(".pdf") ? (
                <embed
                  src={previewData.file}
                  type="application/pdf"
                  className="w-full h-[70vh] rounded-xl border"
                />
              ) : (
                <img
                  src={previewData.file}
                  className="w-full h-[70vh] object-contain rounded-xl"
                  alt={previewData.name}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
