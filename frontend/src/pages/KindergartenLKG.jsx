import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

/* ----------------- WORKSHEETS ------------------ */
const lkgWorksheets = [
  {
    title: "Alphabet Tracing A–Z",
    img: "/worksheets/kindergarten/lkg/alpha-trace.png",
    pdf: "/worksheets/kindergarten/lkg/alpha-trace.pdf",
  },
  {
    title: "Number Counting 1–50",
    img: "/worksheets/kindergarten/lkg/counting.png",
    pdf: "/worksheets/kindergarten/lkg/counting.pdf",
  },
  {
    title: "Fruits & Vegetables Match",
    img: "/worksheets/kindergarten/lkg/fruits-veg.png",
    pdf: "/worksheets/kindergarten/lkg/fruits-veg.pdf",
  },
  {
    title: "Color & Identify Shapes",
    img: "/worksheets/kindergarten/lkg/shapes.png",
    pdf: "/worksheets/kindergarten/lkg/shapes.pdf",
  },
];

const BATCH = 4; // how many to show

/* ----------------- MAIN PAGE ------------------ */

const KindergartenLKG = () => {
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);

  const openPreview = (ws) => setPreviewData(ws);
  const closePreview = () => setPreviewData(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative pt-28 pb-16 overflow-hidden">

        {/* Floating Decor */}
        <motion.div
          className="absolute left-10 top-20 text-5xl opacity-50"
          animate={{ y: [0, -16, 0], rotate: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          🪁
        </motion.div>

        <motion.div
          className="absolute right-12 top-28 text-5xl opacity-50"
          animate={{ y: [0, -14, 0], rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          ☁️
        </motion.div>

        <motion.div
          className="absolute left-20 bottom-10 text-4xl opacity-50"
          animate={{ y: [0, -20, 0], rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
        >
          🛩️
        </motion.div>

        {/* Hero Heading */}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold text-sky-700 drop-shadow-sm"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            LKG Worksheets 🧩
          </motion.h1>

          <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
            Fun & interactive worksheets for Kindergarten LKG learners to explore
            patterns, numbers, alphabet, shapes, objects and early logic activities.
          </p>

          {/* Hero Illustration */}
          
        </div>
      </section>

      {/* ---------------- WORKSHEET GRID ---------------- */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl font-extrabold text-blue-700 mb-14"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          
        </motion.h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {lkgWorksheets.slice(0, visible).map((ws, index) => (
            
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl shadow-xl border-4 
                         border-sky-200 p-6 flex flex-col relative"
            >
              {/* Badge */}
              <div className="absolute -top-4 left-4 bg-sky-500 text-white 
                              px-3 py-1 rounded-lg shadow-md text-sm font-bold">
                LKG
              </div>

              {/* Image */}
              <div className="w-full h-44 bg-white border rounded-xl shadow-inner p-3 flex items-center justify-center">
                <img
                  src={ws.img}
                  alt={ws.title}
                  className="w-full h-full object-contain hover:scale-105 transition"
                />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold text-gray-700 text-center min-h-[55px]">
                {ws.title}
              </h3>

              {/* Buttons */}
              <div className="mt-auto flex gap-3 pt-4">
                <button
                  onClick={() => openPreview(ws)}
                  className="flex-1 flex items-center justify-center gap-2 
                             bg-blue-500 hover:bg-blue-600 text-white py-2 
                             rounded-full shadow-md transition"
                >
                  <FiEye /> View
                </button>

                <a
                  href={ws.pdf}
                  download
                  className="flex-1 flex items-center justify-center gap-2 
                             bg-green-500 hover:bg-green-600 text-white py-2 px-3
                             rounded-full shadow-md transition"
                >
                  <FiDownload /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOAD MORE */}
        {visible < lkgWorksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((v) => v + BATCH)}
              className="px-8 py-3 bg-sky-600 hover:bg-sky-700 
                         text-white rounded-full font-bold text-lg shadow-lg"
            >
              Load More ...
            </button>
          </div>
        )}
      </section>

      {/* ---------------- PREVIEW MODAL ---------------- */}
      <AnimatePresence>
        {previewData && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm 
                       flex items-center justify-center z-[300]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-6 max-w-4xl w-full mx-4 relative"
            >
              <button
                onClick={closePreview}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-blue-600"
              >
                <FiX />
              </button>

              <h2 className="text-xl font-bold text-center mb-4 text-blue-600">
                {previewData.title}
              </h2>

              <div className="w-full h-[70vh]">
                {previewData.pdf.endsWith(".pdf") ? (
                  <embed src={previewData.pdf} type="application/pdf" className="w-full h-full rounded-xl" />
                ) : (
                  <img src={previewData.img} className="w-full h-full object-contain rounded-xl" />
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

export default KindergartenLKG;
