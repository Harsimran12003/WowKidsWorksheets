import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const CATEGORY_MAP = {
  preschool: ["pre-school-tracing", "english", "maths", "science", "homework", "practice"],
  kindergarten: ["Nursery", "LKG", "UKG"],
  "1st-grade": ["English", "Maths", "Science", "Social-studies"],
  "2nd-grade": ["English", "Maths", "Science", "Social-studies"],
  "for-all": ["Coloring", "Puzzles", "Art-Crafts"],
};

export default function AddWorksheet() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ========= SUBMIT FUNCTION =========
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file");

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("file", file);

      const res = await axios.post("http://localhost:5000/api/worksheets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      setMessage("Worksheet added successfully 🎉");

      // Reset fields
      setName("");
      setFile(null);
      setCategory("");
      setSubCategory("");

    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage("Error uploading worksheet ❌");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4"
    >
      <div className="bg-white/60 backdrop-blur-xl border border-pink-200 
                      rounded-3xl shadow-xl p-8 md:p-10 transition-all duration-300">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center">
          ➕ Add New Worksheet
        </h2>

        {/* SUCCESS / ERROR MESSAGE */}
        {message && (
          <div
            className={`text-center py-3 mb-4 rounded-xl font-semibold ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Worksheet Name</label>
            <input
              type="text"
              required
              placeholder="Enter worksheet name"
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Upload File</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              required
              className="p-3 rounded-xl border border-gray-300 shadow-sm bg-white cursor-pointer focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Category</label>
            <select
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory("");
              }}
            >
              <option value="">Select category</option>
              <option value="preschool">Preschool</option>
              <option value="kindergarten">Kindergarten</option>
              <option value="1st-grade">1st Grade</option>
              <option value="2nd-grade">2nd Grade</option>
              <option value="for-all">For All</option>
            </select>
          </div>

          {/* Sub Category */}
          {category && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col"
            >
              <label className="font-semibold text-gray-700 mb-1">Sub Category</label>
              <select
                className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">Select sub category</option>
                {CATEGORY_MAP[category].map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? "Uploading..." : "➕ Add Worksheet"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
