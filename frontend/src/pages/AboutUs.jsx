import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTopRocket from "../components/ScrollToTopRocket.jsx";
import WhatsappButton from "../components/WhatsappButton.jsx";

const AboutUs = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-pink-100 via-yellow-100 to-sky-100">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <section className="relative bg-white py-20 overflow-hidden min-h-screen">
        {/* COLORFUL BACKGROUND SHAPES */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-10 left-10 text-6xl opacity-30"
        >
          🎨
        </motion.div>
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute bottom-10 right-20 text-6xl opacity-40"
        >
          ⭐
        </motion.div>

        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold text-pink-600 text-center mb-10"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            About WowKids Worksheets
          </motion.h1>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8"
          >
            <p className="mb-6">
              Welcome to <strong>WowKids Worksheets</strong>, your ultimate destination for fun, educational, and printable worksheets designed specifically for kids! Whether you're a parent, teacher, or homeschooler, we provide a vast collection of high-quality worksheets that make learning engaging and enjoyable.
            </p>
            <p className="mb-6">
              Our mission is to spark creativity and curiosity in young minds through interactive activities that cover a wide range of subjects including English, Maths, Science, Art, Coloring, Puzzles, and more. From preschool tracing to second-grade challenges, we have something for every age and skill level.
            </p>
          </motion.div>

          {/* What We Offer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-yellow-100 to-pink-100 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-3">📚 Educational Worksheets</h3>
                <p>Over 100+ free printable worksheets covering preschool, kindergarten, and elementary grades. Perfect for reinforcing concepts and building skills.</p>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-3">🎨 Creative Activities</h3>
                <p>Art, coloring, and craft worksheets that encourage imagination and fine motor skills development.</p>
              </div>
              <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-3">🧩 Fun Puzzles & Games</h3>
                <p>Interactive puzzles and games that make learning feel like play while improving problem-solving abilities.</p>
              </div>
              <div className="bg-gradient-to-r from-cyan-100 to-indigo-100 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-3">📱 Device-Friendly</h3>
                <p>All worksheets are optimized for printing and work seamlessly across all devices - computers, tablets, and smartphones.</p>
              </div>
            </div>
          </motion.div>

          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              WowKids Worksheets was born from a passion for making education accessible and enjoyable for every child. We understand that traditional learning methods can sometimes feel monotonous, which is why we've created a platform that combines education with entertainment. Our team of educators and designers work tirelessly to ensure that every worksheet is not only informative but also visually appealing and age-appropriate.
            </p>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Why Choose WowKids Worksheets?</h2>
            <ul className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto space-y-4">
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span><strong>100% Free:</strong> All worksheets are completely free to download and use.</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span><strong>High Quality:</strong> Professionally designed worksheets that meet educational standards.</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span><strong>Safe & Secure:</strong> Kid-friendly content with no ads or inappropriate material.</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span><strong>Easy to Use:</strong> Simple download and print functionality for busy parents and teachers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span><strong>Regular Updates:</strong> New worksheets added regularly to keep content fresh and engaging.</span>
              </li>
            </ul>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-3xl shadow-xl text-white text-2xl font-bold">
              🎉 Start Learning Today!
            </div>
            <p className="mt-4 text-gray-600">Explore our collection of worksheets and watch your child thrive!</p>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTopRocket />
      <WhatsappButton />
    </div>
  );
};

export default AboutUs;