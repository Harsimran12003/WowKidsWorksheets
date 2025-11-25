import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiDownload, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

const API_BASE = "http://localhost:5000";
const BATCH = 4;

const KindergartenNursery = () => {
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
              ws.subCategory === "Nursery"
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-purple-50 to-blue-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-28 pb-20">
        <motion.div
          className="absolute top-10 left-12 text-6xl opacity-40"
          animate={{ y: [0, -15, 0], rotate: [0, 12, -8, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          🧸
        </motion.div>

        <motion.div
          className="absolute top-24 right-16 text-6xl opacity-40"
          animate={{ y: [0, -10, 0], rotate: [0, -12, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          🍭
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-20 text-6xl opacity-40"
          animate={{ y: [0, -18, 0], rotate: [0, 15, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          🌼
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold text-purple-600"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Nursery Worksheets 🎀
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-gray-700 text-lg"
          >
            Fun & engaging worksheets for little nursery learners!
          </motion.p>
        </div>
      </section>

      {/* WORKSHEET GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {displayed.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No Nursery worksheets found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {displayed.map((ws) => (
              <motion.div
                key={ws._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl shadow-xl p-6 border-4 border-purple-200 relative flex flex-col"
              >
                {/* Badge */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-5 left-5 bg-purple-500 text-white px-3 py-1 font-bold rounded-lg shadow-md"
                >
                  ⭐ Nursery
                </motion.div>

                {/* Thumbnail */}
                <div className="w-full h-44 rounded-xl border bg-white shadow-inner p-3 overflow-hidden relative">
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
                <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center min-h-[60px]">
                  {ws.name}
                </h3>

                {/* Buttons */}
                <div className="mt-auto flex gap-3 pt-4">
                  <button
                    onClick={() => openPreview(ws)}
                    className="flex-1 bg-purple-500 text-white py-2 rounded-full shadow hover:bg-purple-600 flex items-center justify-center gap-2"
                  >
                    <FiEye /> View
                  </button>

                  <a
                    href={`${API_BASE}/uploads/worksheets/${ws.file}`}
                    download
                    className="flex-1 bg-pink-500 text-white py-2 px-3 rounded-full shadow hover:bg-pink-600 flex items-center justify-center gap-2"
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
              onClick={() => setVisible((v) => v + BATCH)}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-lg shadow-lg"
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
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-4xl w-full mx-4 relative shadow-2xl"
            >
              <button
                onClick={closePreview}
                className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-purple-600"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">
                {previewData.name}
              </h2>

              <div className="w-full h-[70vh]">
                {previewData.file.endsWith(".pdf") ? (
                  <embed
                    src={`${API_BASE}/uploads/worksheets/${previewData.file}`}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <img
                    src={`${API_BASE}/uploads/worksheets/${previewData.file}`}
                    alt={previewData.name}
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

export default KindergartenNursery;
