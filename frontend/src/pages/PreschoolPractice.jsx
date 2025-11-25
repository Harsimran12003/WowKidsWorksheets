import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

const practiceWorksheets = [
  {
    title: "Alphabet Practice A–Z",
    img: "/worksheets/preschool/practice/alpha-practice.png",
    pdf: "/worksheets/preschool/practice/alpha-practice.pdf",
  },
  {
    title: "Number Practice 1–20",
    img: "/worksheets/preschool/practice/number-practice.png",
    pdf: "/worksheets/preschool/practice/number-practice.pdf",
  },
  {
    title: "Tracing & Writing Practice",
    img: "/worksheets/preschool/practice/write-practice.png",
    pdf: "/worksheets/preschool/practice/write-practice.pdf",
  },
  {
    title: "Matching Pictures & Words",
    img: "/worksheets/preschool/practice/match-words.png",
    pdf: "/worksheets/preschool/practice/match-words.pdf",
  },
  {
    title: "Shapes Practice",
    img: "/worksheets/preschool/practice/shapes-practice.png",
    pdf: "/worksheets/preschool/practice/shapes-practice.pdf",
  },
];

const BATCH = 4;

const PreschoolPractice = () => {
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);

  const openPreview = (ws) => setPreviewData(ws);
  const closePreview = () => setPreviewData(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 text-center overflow-hidden">
        
        {/* Floating Emojis */}
        <motion.span
          className="absolute left-10 top-16 text-5xl opacity-60 pointer-events-none"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🧩
        </motion.span>

        

        <motion.span
          className="absolute left-24 bottom-12 text-5xl opacity-60 pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🔤
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-purple-600"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Preschool Practice Worksheets ✏️🧩
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-lg">
          Fun practice sheets to build writing, matching, tracing, number skills,
          and early learning concepts!
        </p>
      </section>

      {/* WORKSHEETS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">

          {practiceWorksheets.slice(0, visible).map((ws, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8, scale: 1.04 }}
              transition={{ duration: 0.35 }}
              className="relative bg-white rounded-3xl shadow-xl 
                         border-4 border-purple-200 p-5 flex flex-col items-center"
            >
              {/* Ribbon Badge */}
              <div className="absolute -top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-lg shadow-md font-bold text-sm">
                ⭐ 
              </div>

              {/* Worksheet Image */}
              <div className="w-full h-44 bg-white shadow-inner border p-3 rounded-xl flex justify-center items-center">
                <img
                  src={ws.img}
                  alt={ws.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-4 min-h-[60px]">
                {ws.title}
              </h3>

              {/* Buttons */}
              <div className="mt-auto w-full flex gap-3 pt-4">
                <button
                  onClick={() => openPreview(ws)}
                  className="flex-1 flex items-center justify-center gap-2
                             bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-full
                             shadow-md transition"
                >
                  <FiEye /> View
                </button>

                <a
                  href={ws.pdf}
                  download
                  className="flex-1 flex items-center justify-center gap-2
                             bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-full
                             shadow-md transition"
                >
                  <FiDownload /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {visible < practiceWorksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((prev) => prev + BATCH)}
              className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold text-lg shadow-lg"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[300]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-6 max-w-4xl w-full mx-4 relative"
              initial={{ y: 40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.95 }}
            >
              <button
                onClick={closePreview}
                className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-purple-600"
              >
                <FiX />
              </button>

              <h3 className="text-xl md:text-2xl font-bold text-center text-purple-600 mb-4">
                {previewData.title}
              </h3>

              <div className="w-full h-[70vh]">
                {previewData.pdf.endsWith(".pdf") ? (
                  <embed
                    src={previewData.pdf}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <img
                    src={previewData.img}
                    alt={previewData.title}
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
};

export default PreschoolPractice;
