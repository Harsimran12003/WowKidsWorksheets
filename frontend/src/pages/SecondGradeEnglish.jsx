import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";

const API_BASE = "https://wow-kids-worksheets-backend.vercel.app";
const BATCH = 4;

const SecondGradeEnglish = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH ALL & FILTER for 2nd grade → English
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError("");

    fetch(`${API_BASE}/api/worksheets`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch worksheets");
        return res.json();
      })
      .then((data) => {
        if (data?.success && Array.isArray(data.worksheets)) {
          const filtered = data.worksheets.filter((ws) => {
            const cat = (ws.category || "").toString().toLowerCase();
            const sub = (ws.subCategory || ws.subcategory || "").toString().toLowerCase();
            // match "english" subCategory and a category that indicates 2nd grade
            const isSecond =
              cat.includes("2nd") || cat.includes("2") || cat.includes("second") || cat.includes("2nd-grade") || cat.includes("2nd grade");
            return sub === "english" && isSecond;
          });
          setWorksheets(filtered);
        } else {
          setWorksheets([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Could not load worksheets.");
      })
      .finally(() => setLoading(false));
  }, []);

  const displayed = worksheets.slice(0, visible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative pt-28 pb-20 text-center overflow-hidden">
        {/* Floating icons */}
        <motion.span
          className="absolute left-12 top-20 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🔤
        </motion.span>

        <motion.span
          className="absolute right-12 top-24 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📚
        </motion.span>

        <motion.span
          className="absolute left-1/2 bottom-16 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✏️
        </motion.span>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-purple-700 leading-snug"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          2nd Grade English Worksheets ✨
        </motion.h1>

        <p className="text-gray-700 text-lg mt-4 max-w-2xl mx-auto">
          Improve grammar, reading comprehension, tenses, pronouns, and sentence formation with engaging worksheets.
        </p>
      </header>

      {/* WORKSHEETS LIST */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading worksheets...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : displayed.length === 0 ? (
          <p className="text-center text-gray-600 text-xl mt-10">No 2nd Grade → English worksheets found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
              {displayed.map((ws, i) => (
                <motion.div
                  key={ws._id || ws.id || i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="relative bg-white rounded-3xl shadow-xl border-4 border-purple-200 p-5 flex flex-col"
                >
                  {/* Badge */}
                  <div className="absolute -top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-lg shadow font-bold text-sm">
                    ENG
                  </div>

                  {/* Image / PDF Preview */}
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

                  <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-4 min-h-[60px]">
                    {ws.name}
                  </h3>

                  {/* Buttons */}
                  <div className="mt-auto flex gap-3 pt-4">
                    <button
                      onClick={() => setPreviewData(ws)}
                      className="flex-1 bg-purple-500 text-white py-2 rounded-full shadow hover:bg-purple-600 flex items-center justify-center gap-2"
                    >
                      <FiEye /> View
                    </button>

                    <a
                      href={ws.file ? `${ws.file}` : "#"}
                      download={!!ws.file}
                      className="flex-1 bg-green-500 text-white py-2 px-3 rounded-full shadow hover:bg-green-600 flex items-center justify-center gap-2"
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
                  onClick={() => setVisible((prev) => prev + BATCH)}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold shadow-lg text-lg"
                >
                  Load More ...
                </button>
              </div>
            )}
          </>
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
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-3xl w-full shadow-2xl relative"
            >
              {/* close */}
              <button
                onClick={() => setPreviewData(null)}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-purple-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">
                {previewData.name}
              </h2>

              {previewData.file && previewData.file.toLowerCase().endsWith(".pdf") ? (
                <embed
                  src={previewData.file}
                  className="w-full h-[70vh] rounded-xl border"
                  type="application/pdf"
                />
              ) : previewData.file ? (
                <img
                  src={previewData.file}
                  className="w-full h-[70vh] object-contain rounded-xl"
                  alt={previewData.name}
                />
              ) : (
                <div className="w-full h-[70vh] flex items-center justify-center text-gray-400">No preview available</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default SecondGradeEnglish;
