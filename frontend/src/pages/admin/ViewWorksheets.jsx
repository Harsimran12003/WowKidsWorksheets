import React, { useState } from "react";
import { FiEdit, FiTrash, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORY_MAP = {
  Preschool: ["Pre School Tracing", "English", "Maths", "Science", "Homework", "Practice"],
  "Kindergarten": ["Nursery", "LKG", "UKG"],
  "1st Grade": ["English", "Maths", "Science", "Social Studies"],
  "2nd Grade": ["English", "Maths", "Science", "Social Studies"],
  "For All": ["Coloring", "Puzzles", "Art & Crafts"],
};

// Initial sample data — will be replaced once backend is connected
const INITIAL_WORKSHEETS = [
  {
    id: 1,
    name: "Alphabet A-Z",
    category: "Preschool",
    sub: "English",
    filePath: "/worksheets/preschool/english/alphabet-az.pdf",
  },
  {
    id: 2,
    name: "Addition Basics",
    category: "1st Grade",
    sub: "Maths",
    filePath: "/worksheets/grade1/maths/addition-basics.pdf",
  },
];

export default function ViewWorksheets() {
  const [search, setSearch] = useState("");
  const [worksheets, setWorksheets] = useState(INITIAL_WORKSHEETS);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const needle = search.toLowerCase();
  const filtered = worksheets.filter((w) =>
    [w.name, w.category, w.sub, w.filePath]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(needle))
  );

  const handleUpdateWorksheet = (updated) => {
    setWorksheets((prev) =>
      prev.map((w) => (w.id === updated.id ? updated : w))
    );
  };

  const handleDeleteWorksheet = (id) => {
    setWorksheets((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="relative">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        View Worksheets
      </h2>

      {/* SEARCH BAR */}
      <div className="relative w-full mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search by name, category, sub category ..."
          className="w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none text-sm sm:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-pink-200 to-yellow-200">
            <tr>
              <th className="p-3 sm:p-4 font-semibold text-gray-700">Name</th>
              <th className="p-3 sm:p-4 font-semibold text-gray-700">
                Category
              </th>
              <th className="p-3 sm:p-4 font-semibold text-gray-700">
                Sub Category
              </th>
              <th className="p-3 sm:p-4 font-semibold text-gray-700">
                File Path
              </th>
              <th className="p-3 sm:p-4 font-semibold text-gray-700 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {filtered.map((ws) => (
              <tr
                key={ws.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 sm:p-4 align-top">{ws.name}</td>
                <td className="p-3 sm:p-4 align-top">{ws.category}</td>
                <td className="p-3 sm:p-4 align-top">{ws.sub}</td>
                <td className="p-3 sm:p-4 align-top max-w-xs truncate">
                  <span
                    className="inline-block text-xs sm:text-sm text-blue-700 break-all"
                    title={ws.filePath}
                  >
                    {ws.filePath}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="p-3 sm:p-4">
                  <div className="flex justify-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setEditData(ws)}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 transition text-white rounded-lg shadow flex items-center justify-center"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => setDeleteId(ws.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 transition text-white rounded-lg shadow flex items-center justify-center"
                      title="Delete"
                    >
                      <FiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500 text-sm sm:text-base"
                >
                  No worksheets found. Try a different search.
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

      {/* DELETE POPUP */}
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

/* =====================================================
   EDIT MODAL COMPONENT
===================================================== */

function EditModal({ editData, setEditData, onSave }) {
  const [name, setName] = useState(editData.name);
  const [category, setCategory] = useState(editData.category || "");
  const [sub, setSub] = useState(editData.sub || "");
  const [filePath, setFilePath] = useState(editData.filePath || "");
  const [newFileLabel, setNewFileLabel] = useState("");

  const subOptions = category ? CATEGORY_MAP[category] || [] : [];

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    const options = CATEGORY_MAP[value] || [];
    if (!options.includes(sub)) {
      setSub(options[0] || "");
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setNewFileLabel(f.name);
      // Frontend only: we *pretend* the file path is the file name
      setFilePath(`/uploads/${f.name}`);
    }
  };

  const handleSave = () => {
    const updated = {
      ...editData,
      name: name.trim(),
      category,
      sub,
      filePath,
    };
    onSave(updated);
    setEditData(null);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 20 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Edit Worksheet
        </h3>

        {/* NAME */}
        <div className="mb-4">
          <label className="font-semibold text-sm">Worksheet Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-4">
          <label className="font-semibold text-sm">Category</label>
          <select
            className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {Object.keys(CATEGORY_MAP).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* SUBCATEGORY */}
        <div className="mb-4">
          <label className="font-semibold text-sm">Sub Category</label>
          <select
            className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            disabled={!category}
          >
            {!category && <option value="">Select category first</option>}
            {subOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* FILE PATH - READONLY TEXT + FILE INPUT */}
        <div className="mb-4">
          <label className="font-semibold text-sm">File Path</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-lg mt-1 mb-2 text-xs sm:text-sm bg-gray-50"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="/worksheets/grade1/english/file-name.pdf"
          />
          <label className="block text-xs text-gray-600 mb-1">
            Change file 
          </label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="w-full text-xs sm:text-sm"
          />
          {newFileLabel && (
            <p className="mt-1 text-xs text-green-700">
              Selected file: <span className="font-semibold">{newFileLabel}</span>
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setEditData(null)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =====================================================
   DELETE CONFIRM POPUP
===================================================== */

function DeletePopup({ deleteId, setDeleteId, onConfirm }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 60, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 60, scale: 0.95 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center"
      >
        <h3 className="text-xl font-bold mb-3 text-gray-800">
          Delete Worksheet?
        </h3>
        <p className="text-gray-700 mb-6 text-sm">
          Are you sure you want to delete this worksheet? 
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDeleteId(null)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm(deleteId);
              setDeleteId(null);
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
