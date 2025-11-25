import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://localhost:5000"; // LOCAL BACKEND URL

const CATEGORY_MAP = {
  Preschool: ["Pre School Tracing", "English", "Maths", "Science", "Homework", "Practice"],
  Kindergarten: ["Nursery", "LKG", "UKG"],
  "1st Grade": ["English", "Maths", "Science", "Social Studies"],
  "2nd Grade": ["English", "Maths", "Science", "Social Studies"],
  "For All": ["Coloring", "Puzzles", "Art & Crafts"],
};

export default function ViewWorksheets() {
  const [search, setSearch] = useState("");
  const [worksheets, setWorksheets] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // FETCH WORKSHEETS
  useEffect(() => {
    fetch(`${API_BASE}/api/worksheets`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend Response:", data);

        if (data?.success && Array.isArray(data.worksheets)) {
          setWorksheets(data.worksheets.filter((w) => w && typeof w === "object"));
        } else {
          setWorksheets([]);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  // SEARCH FILTER
  const filtered = worksheets
    .filter((w) => w && typeof w === "object") // safety
    .filter((w) =>
      [w.name, w.category, w.subCategory, w.file]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(search.toLowerCase()))
    );

  // UPDATE WITH BACKEND
  const handleUpdateWorksheet = async (updated) => {
    try {
      const formData = new FormData();
      formData.append("name", updated.name);
      formData.append("category", updated.category);
      formData.append("subCategory", updated.subCategory);

      if (updated.newFile) {
        formData.append("file", updated.newFile);
      } else {
        formData.append("existingFile", updated.file);
      }

      const res = await fetch(`${API_BASE}/api/worksheets/${updated._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setWorksheets((prev) =>
          prev.map((w) => (w._id === updated._id ? data.worksheet : w))
        );
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // DELETE WITH BACKEND
  const handleDeleteWorksheet = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/worksheets/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        setWorksheets((prev) => prev.filter((w) => w._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ==============================================================
  // RENDER
  // ==============================================================

  return (
    <div className="relative">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">View Worksheets</h2>

      {/* SEARCH BAR */}
      <div className="relative w-full mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search by name, category, sub category or file..."
          className="w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-pink-200 to-yellow-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Sub Category</th>
              <th className="p-4">File</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((ws) => {
              if (!ws || !ws._id) return null; // SAFE GUARD

              return (
                <tr key={ws._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{ws.name}</td>
                  <td className="p-4">{ws.category}</td>
                  <td className="p-4">{ws.subCategory}</td>

                  <td className="p-4 max-w-xs truncate">
                    <a
                      href={`${API_BASE}/uploads/${ws.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {ws.file}
                    </a>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setEditData(ws)}
                        className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                      >
                        <FiEdit />
                      </button>

                      <button
                        onClick={() => setDeleteId(ws._id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      >
                        <FiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No worksheets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editData && (
          <EditModal
            editData={editData}
            setEditData={setEditData}
            onSave={handleUpdateWorksheet}
          />
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deleteId && (
          <DeletePopup
            deleteId={deleteId}
            setDeleteId={setDeleteId}
            onConfirm={handleDeleteWorksheet}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ======================================================
   EDIT MODAL
====================================================== */

function EditModal({ editData, setEditData, onSave }) {
  const [name, setName] = useState(editData.name);
  const [category, setCategory] = useState(editData.category);
  const [sub, setSub] = useState(editData.subCategory);
  const [file, setFile] = useState(editData.file);
  const [newFile, setNewFile] = useState(null);

  const subOptions = CATEGORY_MAP[category] || [];

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg"
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
      >
        <h3 className="text-2xl font-bold mb-4">Edit Worksheet</h3>

        {/* NAME */}
        <label className="font-semibold text-sm">Name</label>
        <input
          className="w-full border p-2 rounded-lg mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* CATEGORY */}
        <label className="font-semibold text-sm">Category</label>
        <select
          className="w-full border p-2 rounded-lg mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {Object.keys(CATEGORY_MAP).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* SUB CATEGORY */}
        <label className="font-semibold text-sm">Sub Category</label>
        <select
          className="w-full border p-2 rounded-lg mb-4"
          value={sub}
          onChange={(e) => setSub(e.target.value)}
        >
          {subOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* FILE */}
        <label className="font-semibold text-sm">Current File</label>
        <input className="w-full border p-2 rounded-lg mb-2" value={file} disabled />

        <label className="font-semibold text-sm">Upload New File</label>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          className="mb-4"
          onChange={(e) => setNewFile(e.target.files[0])}
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setEditData(null)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSave({
                ...editData,
                name,
                category,
                subCategory: sub,
                file,
                newFile,
              });
              setEditData(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ======================================================
   DELETE MODAL
====================================================== */

function DeletePopup({ deleteId, setDeleteId, onConfirm }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center"
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
      >
        <h3 className="text-xl font-bold mb-4">Delete Worksheet?</h3>
        <p className="text-gray-600 mb-6">This action cannot be undone.</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDeleteId(null)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm(deleteId);   // delete from backend
              setDeleteId(null);     // CLOSE POPUP
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

