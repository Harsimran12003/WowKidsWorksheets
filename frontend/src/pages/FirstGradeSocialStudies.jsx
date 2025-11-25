import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";

// SAMPLE WORKSHEETS (Replace with real ones)
const firstGradeSocialStudies = [
  {
    title: "My Family & Home",
    img: "/worksheets/grade1/social/family-home.png",
    pdf: "/worksheets/grade1/social/family-home.pdf",
  },
  {
    title: "Community Helpers",
    img: "/worksheets/grade1/social/community-helpers.png",
    pdf: "/worksheets/grade1/social/community-helpers.pdf",
  },
  {
    title: "Our Neighborhood",
    img: "/worksheets/grade1/social/neighborhood.png",
    pdf: "/worksheets/grade1/social/neighborhood.pdf",
  },
  {
    title: "Types of Houses",
    img: "/worksheets/grade1/social/houses.png",
    pdf: "/worksheets/grade1/social/houses.pdf",
  },
  {
    title: "Transport Around Us",
    img: "/worksheets/grade1/social/transport.png",
    pdf: "/worksheets/grade1/social/transport.pdf",
  },
  {
    title: "Important Places",
    img: "/worksheets/grade1/social/places.png",
    pdf: "/worksheets/grade1/social/places.pdf",
  },
];

const BATCH = 4;

const FirstGradeSocialStudies = () => {
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);

  const openPreview = (ws) => setPreviewData(ws);
  const closePreview = () => setPreviewData(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-pink-50">
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative pt-28 pb-20 text-center overflow-hidden">
        {/* Floating icons */}
        <motion.span
          className="absolute left-10 top-24 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🌎
        </motion.span>

        <motion.span
          className="absolute right-12 top-20 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🏡
        </motion.span>

        <motion.span
          className="absolute left-1/2 bottom-10 text-6xl opacity-40 pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🗺️
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-orange-700 leading-snug"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          1st Grade Social Studies Worksheets 🌍
        </motion.h1>

        <p className="text-gray-700 text-lg mt-4 max-w-2xl mx-auto">
          Explore family, community helpers, transport, houses,
          neighborhoods & world basics through fun worksheets.
        </p>
      </header>

      {/* WORKSHEETS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {firstGradeSocialStudies.slice(0, visible).map((ws, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{ duration: 0.35 }}
              className="relative bg-white rounded-3xl shadow-xl border-4 border-orange-200 p-5 flex flex-col"
            >
              {/* Badge */}
              <div className="absolute -top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-lg shadow font-bold text-sm">
                SST
              </div>

              {/* Worksheet Preview */}
              <div className="w-full h-44 rounded-xl bg-white shadow-inner border p-3 flex items-center justify-center overflow-hidden">
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

              {/* Buttons */}
              <div className="mt-auto flex gap-3 pt-4">
                <button
                  onClick={() => openPreview(ws)}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-full shadow hover:bg-orange-600 flex items-center justify-center gap-2"
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

        {/* LOAD MORE BUTTON */}
        {visible < firstGradeSocialStudies.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((prev) => prev + BATCH)}
              className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold shadow-lg text-lg"
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
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-orange-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-orange-700">
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

export default FirstGradeSocialStudies;
