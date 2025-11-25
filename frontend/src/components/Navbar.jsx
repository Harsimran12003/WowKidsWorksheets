import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const LOGO_PATH = "/wowkidsworksheetslogo[1].png";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // NEW: search-related state
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allWorksheets, setAllWorksheets] = useState([]);
  

  // Shrink navbar on scroll + update progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const doc = document.documentElement;
      const scrolledPx = doc.scrollTop || document.body.scrollTop;
      const height = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(100, Math.max(0, (scrolledPx / height) * 100));
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch all worksheets once for search suggestions
  useEffect(() => {
    fetch("http://localhost:5000/api/worksheets")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setAllWorksheets(data.worksheets);
        }
      })
      .catch((err) => console.error("Search Fetch Error:", err));
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const v = value.toLowerCase();

    const filtered = allWorksheets.filter((ws) => {
      return (
        ws.name?.toLowerCase().includes(v) ||
        ws.category?.toLowerCase().includes(v) ||
        ws.subCategory?.toLowerCase().includes(v)
      );
    });

    setSuggestions(filtered.slice(0, 8)); // limit to 8 results
  };

  const menuItems = [
    {
      name: "Preschool",
      options: [
        "Pre School Tracing",
        "English",
        "Maths",
        "Science",
        "Homework",
        "Practice",
      ],
    },
    { name: "Kindergarten", options: ["Nursery", "LKG", "UKG"] },
    {
      name: "1st Grade",
      options: [
        "1st Grade English",
        "1st Grade Maths",
        "1st Grade Science",
        "1st Grade Social Studies",
      ],
    },
    {
      name: "2nd Grade",
      options: [
        "2nd Grade English",
        "2nd Grade Maths",
        "2nd Grade Science",
        "2nd Grade Social Studies",
      ],
    },
  ];

  return (
    <header className="relative z-[60]">
      {/* GRADIENT SCROLL PROGRESS BAR (fixed top) */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none">
        <div
          aria-hidden
          className="h-full rounded-r-full"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, #ff5e5e, #ffcc33, #7a8873ff, #4dabff, #ff7ae0)",
            transition: "width 120ms linear",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        />
      </div>

      <nav
        className={`w-full bg-white sticky top-0 z-[70] transition-all duration-300 backdrop-blur-xl bg-white/80 ${
          scrolled ? "py-1 shadow-lg" : "py-2"
        }`}
      >
        <div className="relative max-w-[1350px] mx-auto flex items-center justify-start lg:justify-between px-6">
          {/* FLOATING DECORATIONS (inside nav area) */}
          <div aria-hidden className="pointer-events-none">
            <FloatingBalloon className="hidden md:block absolute -top-6 left-4 z-[40]" delay={0} />
            <FloatingCrayon className="hidden md:block absolute -top-8 right-24 z-[40]" delay={0.5} />
            <FloatingStar className="hidden md:block absolute -top-2 right-2 z-[40]" delay={1.2} />
          </div>

          {/* LOGO WITH LINK TO HOME */}
          <Link to="/">
            <motion.img
              src={LOGO_PATH}
              alt="WowKids Worksheets"
              className={`cursor-pointer transition-all ${
                scrolled ? "w-20" : "w-28"
              }`}
              whileHover={{ scale: 1.04 }}
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-8 text-[17px] font-bold text-gray-800 items-center">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="group cursor-pointer relative"
                onMouseEnter={() => setMegaOpen(item.name)}
                onMouseLeave={() => setMegaOpen(null)}
              >
                <span className="transition">{item.name}</span>

                {/* RAINBOW UNDERLINE */}
                <span className="absolute left-0 bottom-[-6px] w-0 h-[5px] rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 group-hover:w-full transition-all duration-300" />

                {/* MEGA DROPDOWN */}
                <AnimatePresence>
                  {megaOpen === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="absolute top-10 left-0 bg-gradient-to-br from-white to-yellow-50
                                 rounded-2xl shadow-2xl border border-yellow-200 py-4 px-5
                                 min-w-[280px] z-50 cursor-pointer"
                    >
                      <div className="flex flex-col gap-3">
                        {item.options.map((opt, i) => (
                          <Link
                            key={i}
                            to={`/${item.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}/${opt
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            <motion.div
                              whileHover={{ scale: 1.05, x: 4 }}
                              className="flex items-center gap-3 px-3 py-2 text-left
                                         text-gray-700 font-semibold rounded-xl
                                         bg-white hover:bg-pink-100 shadow-sm 
                                         transition-all cursor-pointer"
                            >
                              {/* Cute icon */}
                              <span className="text-xl">⭐</span>

                              {/* Option text */}
                              {opt}
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0">
            {/* SEARCH + AUTOSUGGEST */}
            <div className="relative flex items-center">
              <div className="relative w-full">
                {/* SEARCH INPUT FIELD */}
                <AnimatePresence>
                  {openSearch && (
                    <motion.input
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 260, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      placeholder="Search worksheets..."
                      value={searchText}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="bg-white border border-blue-300 px-4 py-1 rounded-full shadow-md 
                                 text-gray-700 outline-none mr-2"
                      autoFocus
                    />
                  )}
                </AnimatePresence>

                {/* AUTOSUGGEST DROPDOWN */}
                <AnimatePresence>
                  {openSearch && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25 }}
                      className="absolute top-11 left-0 w-72 bg-white shadow-xl rounded-xl p-3 
                                 border border-gray-200 z-[200]"
                    >
                     {suggestions.map((ws, i) => {
  const rawCategory = ws.category?.toLowerCase() || "";
  const rawSub = ws.subCategory?.toLowerCase() || "";

  const categorySlug = rawCategory.replace(/\s+/g, "-");
  const subSlugBase = rawSub.replace(/\s+/g, "-");

  let finalURL = "/";

  // RULE 3: For-All category → Only /subCategory
  if (categorySlug === "for-all") {
    finalURL = `/${subSlugBase}`;
  }

  // RULE 1: Preschool / Kindergarten → /category/subCategory
  else if (categorySlug === "preschool" || categorySlug === "kindergarten") {
    finalURL = `/${categorySlug}/${subSlugBase}`;
  }

  // RULE 2: 1st & 2nd Grade → /category/category-subcategory
  else if (categorySlug === "1st-grade" || categorySlug === "2nd-grade") {
    finalURL = `/${categorySlug}/${categorySlug}-${subSlugBase}`;
  }

  // (Optional fallback)
  else {
    finalURL = `/${categorySlug}/${subSlugBase}`;
  }

  return (
    <Link
      key={i}
      to={finalURL}
      onClick={() => {
        setOpenSearch(false);
        setSearchText("");
        setSuggestions([]);
      }}
    >
      <div className="px-3 py-2 hover:bg-blue-50 rounded-lg flex flex-col cursor-pointer">
        <span className="font-semibold text-gray-800">{ws.name}</span>
        <span className="text-xs text-gray-500">
          {ws.category} → {ws.subCategory}
        </span>
      </div>
    </Link>
  );
})}


                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SEARCH ICON BUTTON */}
              <motion.button
                className="w-20 h-9 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 
                           flex items-center justify-center shadow cursor-pointer hover:scale-110 ml-2"
                onClick={() => {
                  setOpenSearch((s) => !s);
                  if (openSearch) {
                    setSearchText("");
                    setSuggestions([]);
                  }
                }}
                aria-label="Open search"
              >
                <FiSearch className="text-white text-xl" />
              </motion.button>
            </div>

            {/* SOCIAL ICONS (desktop) */}
            <div className="hidden md:flex gap-2">
              <IconWrapper>
                <FaInstagram className="text-pink-500" />
              </IconWrapper>
              <IconWrapper>
                <FaFacebookF className="text-blue-600" />
              </IconWrapper>
              <IconWrapper>
                <FaTwitter className="text-sky-500" />
              </IconWrapper>
            </div>

            {/* PRIVACY (desktop) */}
            <Link to="/privacy-policy">
              <motion.button
                className="hidden md:block px-4 py-1.5 font-bold text-white rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md border border-orange-600 hover:scale-105 cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                Privacy Policy
              </motion.button>
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <button
              className="lg:hidden text-3xl ml-1"
              onClick={() => setMenuOpen((s) => !s)}
              aria-label="Open menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white shadow-md px-6 py-4 flex flex-col gap-4"
            >
              {menuItems.map((item, idx) => (
                <details key={idx} className="border-b pb-2">
                  <summary className="cursor-pointer font-semibold">
                    {item.name}
                  </summary>

                  <div className="pl-4 mt-2 flex flex-col gap-1">
                    {item.options.map((opt, i) => (
                      <Link
                        key={i}
                        to={`/${item.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}/${opt
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        onClick={() => setMenuOpen(false)}
                        className="text-sm hover:text-blue-500 cursor-pointer py-1"
                      >
                        {opt}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}

              <div className="flex gap-3 pt-1">
                <IconWrapper>
                  <FaInstagram className="text-pink-500" />
                </IconWrapper>
                <IconWrapper>
                  <FaFacebookF className="text-blue-600" />
                </IconWrapper>
                <IconWrapper>
                  <FaTwitter className="text-sky-500" />
                </IconWrapper>
              </div>

              {/* Mobile Privacy Policy */}
              <Link to="/privacy-policy" onClick={() => setMenuOpen(false)}>
                <div className="mt-4 text-blue-600 font-semibold text-sm">
                  Privacy Policy
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* FLOATING DECORATIONS (outside nav, around header area) */}
      <div aria-hidden className="pointer-events-none">
        <FloatingBalloon className="hidden md:block absolute -top-6 left-8" delay={0} />
        <FloatingCrayon className="hidden md:block absolute -top-8 right-32" delay={0.5} />
        <FloatingStar className="hidden md:block absolute top-12 right-8" delay={1.2} />
      </div>
    </header>
  );
};

const IconWrapper = ({ children }) => (
  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center shadow hover:scale-110 transition cursor-pointer">
    {children}
  </div>
);

/* ---------- Floating SVG components (simple, lightweight) ---------- */

const floatVariants = {
  float: (d = 0) => ({
    y: [0, -10, 0],
    rotate: [0, 6, -3, 0],
    transition: { duration: 4 + d, repeat: Infinity, ease: "easeInOut" },
  }),
};

const FloatingBalloon = ({ className = "", delay = 0 }) => (
  <motion.div
    className={className}
    variants={floatVariants}
    animate="float"
    custom={delay}
    style={{ zIndex: 30 }}
  >
    <svg
      width="80"
      height="110"
      viewBox="0 0 64 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="32"
        cy="34"
        rx="22"
        ry="28"
        fill="#ff7ae0"
        stroke="#e85ab2"
        strokeWidth="2"
      />
      <path
        d="M28 60 q4 8 8 0"
        stroke="#e85ab2"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="30" y="64" width="4" height="18" rx="2" fill="#e85ab2" />
    </svg>
  </motion.div>
);

const FloatingCrayon = ({ className = "", delay = 0 }) => (
  <motion.div
    className={className}
    variants={floatVariants}
    animate="float"
    custom={delay}
    style={{ zIndex: 30 }}
  >
    <svg
      width="72"
      height="32"
      viewBox="0 0 72 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="8"
        width="60"
        height="16"
        rx="4"
        fill="#ffd33d"
        stroke="#e6b800"
        strokeWidth="2"
      />
      <polygon
        points="62,8 70,16 62,24"
        fill="#ffd33d"
        stroke="#e6b800"
        strokeWidth="2"
      />
      <rect x="8" y="10" width="10" height="12" rx="2" fill="#ff5e5e" />
    </svg>
  </motion.div>
);

const FloatingStar = ({ className = "", delay = 0 }) => (
  <motion.div
    className={className}
    variants={{
      float: {
        y: [0, -8, 0],
        rotate: [0, 20, -10, 0],
        transition: { duration: 3.6 + delay, repeat: Infinity, ease: "easeInOut" },
      },
    }}
    animate="float"
    style={{ zIndex: 30 }}
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2 L14.5 8.5 L21 9.2 L16 13.8 L17.2 20.5 L12 17.6 L6.8 20.5 L8 13.8 L3 9.2 L9.5 8.5 Z"
        fill="#ffcc33"
        stroke="#e6a600"
        strokeWidth="0.6"
      />
    </svg>
  </motion.div>
);

export default Navbar;
