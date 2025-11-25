import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

const scienceWorksheets = [
  {
    title: "Plant Life: Parts of a Plant",
    img: "/worksheets/preschool/science/plant-parts.png",
    pdf: "/worksheets/preschool/science/plant-parts.pdf",
  },
  {
    title: "My Five Senses",
    img: "/worksheets/preschool/science/five-senses.png",
    pdf: "/worksheets/preschool/science/five-senses.pdf",
  },
  {
    title: "Floating & Sinking",
    img: "/worksheets/preschool/science/floating-sinking.png",
    pdf: "/worksheets/preschool/science/floating-sinking.pdf",
  },
  {
    title: "Animals & Habitats",
    img: "/worksheets/preschool/science/animals-habitats.png",
    pdf: "/worksheets/preschool/science/animals-habitats.pdf",
  },
  {
    title: "Simple Experiments (Safe)",
    img: "/worksheets/preschool/science/simple-experiments.png",
    pdf: "/worksheets/preschool/science/simple-experiments.pdf",
  },
];

const BATCH = 4;

const PreschoolScience = () => {
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);

  const openPreview = (ws) => setPreviewData(ws);
  const closePreview = () => setPreviewData(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-pink-50">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 text-center overflow-hidden">

        {/* Floating Icons (not overlapping text) */}
        <motion.span
          className="absolute left-8 top-16 text-5xl opacity-60 pointer-events-none"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🔬
        </motion.span>

        

        <motion.span
          className="absolute left-20 bottom-16 text-5xl opacity-60 pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🧬
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-green-700"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Preschool Science Worksheets 🔬🧪
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-lg">
          Explore animals, plants, senses, and simple experiments — designed to spark early scientific curiosity!
        </p>
      </section>

      {/* WORKSHEETS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {scienceWorksheets.slice(0, visible).map((ws, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative bg-white rounded-3xl shadow-xl border-4 border-green-200 p-5 flex flex-col items-center"
            >
              {/* Ribbon Badge */}
              <div className="absolute -top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-lg shadow-md font-bold text-sm">
                🔬 
              </div>

              {/* Worksheet Preview */}
              <div className="w-full h-44 bg-white shadow-inner border p-3 rounded-xl flex justify-center items-center">
                <img
                  src={ws.img}
                  alt={ws.title}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-4 min-h-[60px]">
                {ws.title}
              </h3>

              {/* Action Buttons */}
              <div className="mt-auto w-full flex gap-3 pt-4">
                <button
                  onClick={() => openPreview(ws)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-full shadow-md hover:bg-green-600"
                >
                  <FiEye /> View
                </button>

                <a
                  href={ws.pdf}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-3 rounded-full shadow-md hover:bg-blue-600"
                >
                  <FiDownload /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {visible < scienceWorksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((prev) => prev + BATCH)}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-lg shadow-lg"
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
              {/* Close Btn */}
              <button
                onClick={closePreview}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-green-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
                {previewData.title}
              </h2>

              {previewData.pdf.endsWith(".pdf") ? (
                <embed
                  src={previewData.pdf}
                  type="application/pdf"
                  className="w-full h-[70vh] rounded-xl border"
                />
              ) : (
                <img
                  src={previewData.img}
                  className="w-full h-[70vh] object-contain rounded-xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default PreschoolScience;
