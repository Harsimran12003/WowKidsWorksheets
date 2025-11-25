import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";

// SAMPLE WORKSHEETS (Replace with real ones)
const firstGradeEnglish = [
  {
    title: "Nouns & Naming Words",
    img: "/worksheets/grade1/english/nouns.png",
    pdf: "/worksheets/grade1/english/nouns.pdf",
  },
  {
    title: "Common & Proper Nouns",
    img: "/worksheets/grade1/english/common-proper.png",
    pdf: "/worksheets/grade1/english/common-proper.pdf",
  },
  {
    title: "Singular & Plural",
    img: "/worksheets/grade1/english/singular-plural.png",
    pdf: "/worksheets/grade1/english/singular-plural.pdf",
  },
  {
    title: "Action Words (Verbs)",
    img: "/worksheets/grade1/english/verbs.png",
    pdf: "/worksheets/grade1/english/verbs.pdf",
  },
  {
    title: "Describing Words (Adjectives)",
    img: "/worksheets/grade1/english/adjectives.png",
    pdf: "/worksheets/grade1/english/adjectives.pdf",
  },
  {
    title: "Rhyming Words",
    img: "/worksheets/grade1/english/rhyming.png",
    pdf: "/worksheets/grade1/english/rhyming.pdf",
  },
];

const BATCH = 4;

const FirstGradeEnglish = () => {
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);

  const openPreview = (ws) => setPreviewData(ws);
  const closePreview = () => setPreviewData(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative pt-28 pb-20 overflow-hidden text-center">

        {/* Floating icons */}
        <motion.span
          className="absolute left-10 top-24 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🅰️
        </motion.span>

        <motion.span
          className="absolute right-12 top-28 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📝
        </motion.span>

        {/* Centered title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-blue-700 leading-snug"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          1st Grade English Worksheets ✨
        </motion.h1>

        <p className="text-gray-700 text-lg mt-4 max-w-2xl mx-auto">
          Fun and engaging worksheets covering nouns, verbs, adjectives,
          rhyming words & more — designed specially for young learners.
        </p>
      </header>

      {/* WORKSHEETS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {firstGradeEnglish.slice(0, visible).map((ws, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl shadow-xl border-4 border-blue-200 p-5 flex flex-col relative"
            >
              {/* Badge */}
              <div className="absolute -top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg shadow font-bold text-sm">
                ENG
              </div>

              {/* Preview */}
              <div className="w-full h-44 rounded-xl bg-white shadow-inner border p-3 flex items-center justify-center overflow-hidden">
                <img
                  src={ws.img}
                  alt={ws.title}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale(1.05)"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-4 min-h-[60px]">
                {ws.title}
              </h3>

              {/* Buttons */}
              <div className="mt-auto flex gap-3 pt-4">
                <button
                  onClick={() => openPreview(ws)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-full shadow hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                  <FiEye /> View
                </button>

                <a
                  href={ws.pdf}
                  download
                  className="flex-1 bg-green-500 text-white py-2 px-3 rounded-full shadow hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <FiDownload /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {visible < firstGradeEnglish.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((prev) => prev + BATCH)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg text-lg"
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
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-3xl w-full shadow-2xl relative"
            >
              <button
                onClick={closePreview}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-blue-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
                {previewData.title}
              </h2>

              {previewData.pdf.endsWith(".pdf") ? (
                <embed
                  src={previewData.pdf}
                  className="w-full h-[70vh] rounded-xl border"
                  type="application/pdf"
                />
              ) : (
                <img
                  src={previewData.img}
                  className="w-full h-[70vh] object-contain rounded-xl"
                  alt={previewData.title}
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

export default FirstGradeEnglish;
