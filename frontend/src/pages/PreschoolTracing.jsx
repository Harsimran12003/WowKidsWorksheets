import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

// SAMPLE WORKSHEETS — Replace with your actual PDFs/images
const tracingWorksheets = [
  {
    title: "Alphabet Tracing A-Z",
    img: "/worksheets/preschool/alpha-trace.png",
    pdf: "/worksheets/preschool/alpha-trace.pdf",
  },
  {
    title: "Number Tracing 1-20",
    img: "/worksheets/preschool/number-trace.png",
    pdf: "/worksheets/preschool/number-trace.pdf",
  },
  {
    title: "Shapes Tracing",
    img: "/worksheets/preschool/shapes-trace.png",
    pdf: "/worksheets/preschool/shapes-trace.pdf",
  },
  {
    title: "Lines & Patterns Tracing",
    img: "/worksheets/preschool/pattern-trace.png",
    pdf: "/worksheets/preschool/pattern-trace.pdf",
  },
  {
    title: "Lines & Patterns Tracing",
    img: "/worksheets/preschool/pattern-trace.png",
    pdf: "/worksheets/preschool/pattern-trace.pdf",
  },
];

// How many to show per batch
const BATCH = 4;

const PreschoolTracing = () => {
  const [visible, setVisible] = useState(BATCH);
  const [previewData, setPreviewData] = useState(null); // holds opened worksheet

  const openPreview = (ws) => setPreviewData(ws);
  const closePreview = () => setPreviewData(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-yellow-50 to-blue-50">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 text-center overflow-hidden">
        {/* Floating Decor */}
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
          Help little learners practice writing and improve fine motor skills with
          fun & interactive tracing worksheets!
        </p>
      </section>

      {/* WORKSHEETS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {tracingWorksheets.slice(0, visible).map((ws, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.35 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl 
                   border-4 border-pink-200 relative p-5 flex flex-col 
                   items-center"
            >
              {/* Cute floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-4 right-4 text-3xl"
              >
                ✨
              </motion.div>

              {/* Worksheet preview */}
              <div className="w-full h-44 rounded-2xl bg-white shadow-inner 
                        border border-gray-200 p-3 flex items-center justify-center 
                        overflow-hidden relative">
                <img
                  src={ws.img}
                  alt={ws.title}
                  className="w-full h-full object-contain transition-transform 
                       duration-300 hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-4 px-2 min-h-[56px]">
                {ws.title}
              </h3>

              {/* BUTTON AREA */}
              <div className="mt-auto w-full flex justify-between gap-3 pt-4">
                <button
                  onClick={() => openPreview(ws)}
                  className="flex-1 flex items-center justify-center gap-2 
                       bg-blue-500 hover:bg-blue-600 text-white py-2 
                       rounded-full font-semibold shadow-md transition cursor-pointer"
                >
                  <FiEye /> View
                </button>

                <a
                  href={ws.pdf}
                  download
                  className="flex-1 flex items-center justify-center gap-2 
                       bg-green-500 hover:bg-green-600 text-white py-2 px-3 
                       rounded-full font-semibold shadow-md transition"
                >
                  <FiDownload /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {visible < tracingWorksheets.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisible((prev) => prev + BATCH)}
              className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold shadow-lg text-lg cursor-pointer transition"
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
              {/* CLOSE BUTTON */}
              <button
                onClick={closePreview}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-pink-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-pink-600">
                {previewData.title}
              </h2>

              {/* PREVIEW AREA: Image or PDF */}
              {previewData.pdf.endsWith(".pdf") ? (
                <embed
                  src={previewData.pdf}
                  type="application/pdf"
                  className="w-full h-[70vh] rounded-xl border-2"
                />
              ) : (
                <img
                  src={previewData.img}
                  alt={previewData.title}
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
