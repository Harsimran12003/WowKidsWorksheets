import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

// UKG worksheets (replace with your actual files)
const ukgWorksheets = [
  {
    title: "UKG English Practice",
    img: "/worksheets/kindergarten/ukg/ukg-english.png",
    pdf: "/worksheets/kindergarten/ukg/ukg-english.pdf",
  },
  {
    title: "UKG Maths – Add & Subtract",
    img: "/worksheets/kindergarten/ukg/ukg-maths.png",
    pdf: "/worksheets/kindergarten/ukg/ukg-maths.pdf",
  },
  {
    title: "UKG EVS – My Family",
    img: "/worksheets/kindergarten/ukg/ukg-evs.png",
    pdf: "/worksheets/kindergarten/ukg/ukg-evs.pdf",
  },
  {
    title: "UKG Reading Worksheet",
    img: "/worksheets/kindergarten/ukg/ukg-reading.png",
    pdf: "/worksheets/kindergarten/ukg/ukg-reading.pdf",
  },
  {
    title: "UKG Counting Practice",
    img: "/worksheets/kindergarten/ukg/ukg-counting.png",
    pdf: "/worksheets/kindergarten/ukg/ukg-counting.pdf",
  },
];

const BATCH = 4;

const KindergartenUKG = () => {
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null);

  const openPreview = (ws) => setPreviewData(ws);
  const closePreview = () => setPreviewData(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 text-center overflow-hidden">
        {/* Floating Decor */}
        <motion.div
          className="absolute left-10 top-20 text-5xl opacity-70"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🎒
        </motion.div>

        <motion.div
          className="absolute right-20 top-28 text-5xl opacity-70"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ✏️
        </motion.div>

        <motion.div
          className="absolute right-10 bottom-10 text-5xl opacity-70"
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          📘
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-purple-600"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          UKG Worksheets 🎓
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-lg">
          Advanced worksheets designed for Upper Kindergarten learners —
          covering early maths, English, EVS & reading skills with fun visuals
          and activities!
        </p>
      </section>

      {/* WORKSHEETS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {ukgWorksheets.slice(0, visible).map((ws, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative bg-white rounded-3xl shadow-xl 
                         border-4 border-purple-200 p-5 flex flex-col items-center"
            >
              {/* Badge */}
              <div className="absolute -top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-lg shadow-md font-bold text-sm">
                UKG
              </div>

              {/* Preview */}
              <div className="w-full h-44 bg-white shadow-inner border rounded-xl p-3 flex justify-center items-center">
                <img
                  src={ws.img}
                  alt={ws.title}
                  className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-4 min-h-[60px]">
                {ws.title}
              </h3>

              {/* Buttons */}
              <div className="mt-auto w-full flex gap-3 pt-4">
                <button
                  onClick={() => openPreview(ws)}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 
                             text-white py-2 rounded-full font-semibold shadow-md 
                             transition flex items-center justify-center gap-2"
                >
                  <FiEye /> View
                </button>

                <a
                  href={ws.pdf}
                  download
                  className="flex-1 bg-green-500 hover:bg-green-600 
                             text-white py-2 px-3 rounded-full font-semibold shadow-md 
                             transition flex items-center justify-center gap-2"
                >
                  <FiDownload /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {visible < ukgWorksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((prev) => prev + BATCH)}
              className="px-8 py-3 bg-purple-500 hover:bg-purple-600 
                         text-white rounded-full font-bold shadow-lg text-lg"
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
                onClick={closePreview}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-purple-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-purple-600">
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

      <Footer />
    </div>
  );
};

export default KindergartenUKG;
