import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      
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

      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-pink-600"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          About WowKids Worksheets
        </motion.h2>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto"
        >
          WowKids Worksheets for kids is a hub of online printable worksheets for toddlers, 
          preschoolers and even adults. We offer a large variety of online worksheets that come
          handy, moreover these free worksheets can easily be incorporated in any syllabus
          or curriculum. <span className="font-bold text-pink-600">More than 100+ worksheets</span> for everyone.
          These free printable worksheets are easy to access, safe for kids of all ages, and 
          compatible with every device. Try these amazing free printable worksheets for kids 
          and perk up the monotonous learning. 🌈
        </motion.p>

        {/* Highlight Box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-10 inline-block px-10 py-5 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-3xl shadow-xl text-white text-2xl font-bold"
        >
          🎉 100+ Free Worksheets Available
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
