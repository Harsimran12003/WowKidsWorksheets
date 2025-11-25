import React, { useState } from "react";
import AddWorksheet from "./AddWorksheet";
import ViewWorksheets from "./ViewWorksheets";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const LOGO = "/wowkidsworksheetslogo[1].png";

export default function AdminDashboard() {
  const [tab, setTab] = useState("add");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-yellow-100 to-pink-100">

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-md">
        <Link to="/">
          <img src={LOGO} alt="logo" className="w-20" />
        </Link>

        <button
          className="text-3xl font-bold"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE SIDEBAR SLIDE-IN ================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl p-6 z-[200] lg:hidden overflow-y-auto"
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-3xl"
            >
              ✕
            </button>

            <SidebarContent tab={tab} setTab={setTab} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex flex-col w-72 bg-white shadow-xl p-6 relative overflow-y-auto">

        <Link to="/" className="flex justify-center mb-6">
          <img src={LOGO} className="w-32 drop-shadow-md" />
        </Link>

        <SidebarContent tab={tab} setTab={setTab} />

        {/* DECORATIONS */}
        <div className="absolute bottom-6 left-6 text-4xl animate-bounce">🎨</div>
        <div className="absolute top-6 right-6 text-4xl animate-pulse">⭐</div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 w-full p-4 sm:p-6 lg:p-10 overflow-y-auto">

        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-pink-200">

          <AnimatePresence mode="wait">
            {tab === "add" && (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <AddWorksheet />
              </motion.div>
            )}

            {tab === "view" && (
              <motion.div
                key="view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <ViewWorksheets />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}


/* ================= SIDEBAR CONTENT (BOTH MOBILE + DESKTOP) ================= */

function SidebarContent({ tab, setTab }) {
  return (
    <div className="flex flex-col gap-4 mt-6">

      {/* ADD WORKSHEET */}
      <button
        onClick={() => setTab("add")}
        className={`px-4 py-3 rounded-xl font-semibold transition text-left ${
          tab === "add"
            ? "bg-gradient-to-r from-pink-500 to-red-400 text-white shadow-lg scale-[1.03] cursor-pointer"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
        }`}
      >
        ➕ Add Worksheet
      </button>

      {/* VIEW WORKSHEETS */}
      <button
        onClick={() => setTab("view")}
        className={`px-4 py-3 rounded-xl font-semibold transition text-left ${
          tab === "view"
            ? "bg-gradient-to-r from-purple-500 to-blue-400 text-white shadow-lg scale-[1.03] cursor-pointer"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
        }`}
      >
        📄 View Worksheets
      </button>

      {/* BACK TO WEBSITE */}
      <Link
        to="/"
        className="mt-6 text-center bg-yellow-300 hover:bg-yellow-400 transition px-4 py-2 rounded-xl font-bold shadow"
      >
        ⬅ Back to Website
      </Link>
    </div>
  );
}
