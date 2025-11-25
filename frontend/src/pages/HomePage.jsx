import React from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import AboutSection from "../components/AboutSection.jsx";
import SubjectCardsSection from "../components/SubjectCardsSection.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTopRocket from "../components/ScrollToTopRocket.jsx";
import WhatsappButton from "../components/WhatsappButton.jsx";

const rainbowColors = ["#ff5e5e", "#ffcc33", "#7ed957", "#4dabff", "#ff7ae0"];
const logo = "./wowkidsworksheetslogo.png";

// Floating star component
const Star = ({ delay, size }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.4 }}
    animate={{ opacity: 1, scale: [1, 1.2, 1] }}
    transition={{ repeat: Infinity, duration: 2.5, delay }}
    className="absolute"
    style={{ fontSize: size }}
  >
    ✨
  </motion.div>
);

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-pink-100 via-yellow-100 to-sky-100">
      {/* NAVBAR */}
      <Navbar />

      <HeroSection />
      <AboutSection />
      <SubjectCardsSection />
      <Footer />
      <ScrollToTopRocket />
      <WhatsappButton />

        
    </div>
  );
}
