import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

const API_BASE = "http://localhost:5000";
const BATCH = 4;

const KindergartenUKG = () => {
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
              ws.category === "kindergarten" &&
              ws.subCategory === "UKG"
          );
          setWorksheets(filtered);
        }
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const displayed = worksheets.slice(0, visible);

  const openPreview = (ws) => setPreviewData(ws);
  const closePreview = () => setPreviewData(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 text-center overflow-hidden">
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
          Advanced worksheets for Upper Kindergarten learners — covering maths,
          English, EVS & reading skills!
        </p>
      </section>

      {/* WORKSHEETS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {displayed.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No UKG worksheets found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {displayed.map((ws) => (
              <motion.div
                key={ws._id}
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

                {/* Thumbnail Preview */}
                <div className="w-full h-44 border bg-white shadow-inner rounded-xl p-3 overflow-hidden relative">
                  {ws.file.endsWith(".pdf") ? (
                    <iframe
                      src={`${API_BASE}/uploads/worksheets/${ws.file}#toolbar=0`}
                      className="absolute top-0 left-0 w-[200%] h-[200%] scale-[0.5] origin-top-left pointer-events-none"
                    />
                  ) : (
                    <img
                      src={`${API_BASE}/uploads/worksheets/${ws.file}`}
                      alt={ws.name}
                      className="w-full h-full object-contain"
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
                    onClick={() => openPreview(ws)}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 
                               text-white py-2 rounded-full font-semibold shadow-md 
                               transition flex items-center justify-center gap-2"
                  >
                    <FiEye /> View
                  </button>

                  <a
                    href={`${API_BASE}/uploads/worksheets/${ws.file}`}
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
        )}

        {/* LOAD MORE */}
        {visible < worksheets.length && (
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
              <button
                onClick={closePreview}
                className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-purple-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-purple-600">
                {previewData.name}
              </h2>

              {previewData.file.endsWith(".pdf") ? (
                <embed
                  src={`${API_BASE}/uploads/worksheets/${previewData.file}`}
                  type="application/pdf"
                  className="w-full h-[70vh] rounded-xl"
                />
              ) : (
                <img
                  src={`${API_BASE}/uploads/worksheets/${previewData.file}`}
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
};

export default KindergartenUKG;
