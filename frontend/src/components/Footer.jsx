import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-pink-300 via-yellow-300 to-sky-300 pt-20 pb-10 overflow-hidden">
      
      {/* Floating Emojis */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute text-6xl opacity-20 left-10 bottom-24"
      >
        🎈
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute text-6xl opacity-20 right-12 top-10"
      >
        ⭐
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 text-center text-white">

    

        {/* Description */}
        <p className="mt-5 max-w-4xl mx-auto text-lg font-medium text-gray-800">
          Online worksheets for kids - free worksheets, worksheets for adults, worksheets for kids, worksheets for girls,
          worksheets for boys, worksheets for parents, worksheets for teachers and much more. Online worksheets for kids is
          a site that offers a wide range of printable worksheets for children of all ages, moreover these worksheets are
          free of all charges and available online. These online worksheets serve as a helping aid for parents and teachers
          who look for new and fun ways to teach kids. These online worksheets work best on any android and iOS device
          including iPhones, iPads and other gadgets.
        </p>

        {/* Contact */}
        <p className="mt-6 text-xl font-bold text-pink-700">
          📩 Contact Us:{" "}
          <a href="mailto:support@wowkidsworksheets.com" className="underline hover:text-blue-700">
            support@wowkidsworksheets.com
          </a>
        </p>

        {/* Social icons */}
        <div className="flex justify-center gap-6 mt-10">
          {[
            { icon: <FaFacebookF />, link: "#" },
            { icon: <FaInstagram />, link: "#" },
            { icon: <FaYoutube />, link: "#" },
            { icon: <FaPinterestP />, link: "#" },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="bg-white text-pink-600 p-4 rounded-full shadow-lg text-2xl hover:bg-yellow-100 transition"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-10 text-gray-800 font-semibold">
          © 2025 WowKids Worksheets. All Rights Reserved 🌟
        </p>
        <p className="mt-7 text-gray-500 text-[14px] mb-45">
          Powered by Excellence Web Solutions <br />
        </p>
      </div>

      {/* Animated Wave SVG */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute -bottom-1 left-0 w-full"
      >
        <svg viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,133.3C672,139,768,181,864,202.7C960,224,1056,224,1152,224C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,
            1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,
            288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </footer>
  );
};

export default Footer;
