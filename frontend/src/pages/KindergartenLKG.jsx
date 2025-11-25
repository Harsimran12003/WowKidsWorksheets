import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Footer from "../components/Footer";

const API_BASE = "http://localhost:5000";
const BATCH = 4;

const KindergartenLKG = () => {
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
              ws.subCategory === "LKG"
          );
          setWorksheets(filtered);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const displayed = worksheets.slice(0, visible);

  const openPreview = (ws) => setPreviewData(ws);
  const closePreview = () => setPreviewData(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-16 overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold text-sky-700"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            LKG Worksheets 🧩
          </motion.h1>

          <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
            Fun & interactive worksheets for Kindergarten LKG learners!
          </p>
        </div>
      </section>

      {/* WORKSHEET GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

        {displayed.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-8">
            No LKG worksheets available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {displayed.map((ws) => (
              <motion.div
                key={ws._id}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl shadow-xl border-4 border-sky-200 p-6 flex flex-col relative"
              >
                {/* Badge */}
                <div className="absolute -top-4 left-4 bg-sky-500 text-white px-3 py-1 rounded-lg shadow-md text-sm font-bold">
                  LKG
                </div>

                {/* Thumbnail */}
                <div className="w-full h-44 bg-white border rounded-xl shadow-inner p-3 overflow-hidden relative">
                  {ws.file.endsWith(".pdf") ? (
                    <iframe
                      src={`${ws.file}#toolbar=0`}
                      className="absolute top-0 left-0 w-[200%] h-[200%] scale-[0.5] origin-top-left pointer-events-none"
                    />
                  ) : (
                    <img
                      src={ws.file}
                      alt={ws.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-semibold text-gray-700 text-center min-h-[55px]">
                  {ws.name}
                </h3>

                {/* Buttons */}
                <div className="mt-auto flex gap-3 pt-4">
                  <button
                    onClick={() => openPreview(ws)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full shadow-md"
                  >
                    <FiEye /> View
                  </button>

                  <a
                    href={ws.file}
                    download
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-full shadow-md"
                  >
                    <FiDownload /> Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More */}
        {visible < worksheets.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((v) => v + BATCH)}
              className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-bold text-lg shadow-lg"
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
                {previewData.name}
              </h2>

              <div className="w-full h-[70vh]">
                {previewData.file.endsWith(".pdf") ? (
                  <embed
                    src={previewData.file}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <img
                    src={previewData.file}
                    className="w-full h-full object-contain rounded-xl"
                    alt={previewData.name}
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

export default KindergartenLKG;
