import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const TermsAndConditions = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-blue-50">
      <Navbar />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-20"
      >
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          Terms & Conditions
        </h1>

        <div className="bg-white shadow-xl rounded-3xl p-8 text-gray-700 leading-relaxed space-y-6">
          
          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">1. Introduction</h2>
            <p>
              Welcome to <strong>WowKids Worksheets</strong>. By browsing, accessing, or downloading any content from our platform, you agree to comply with these Terms & Conditions. 
              Please review them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">2. Use of Worksheets</h2>
            <p>
              All worksheets provided on this website are for **personal, educational, and non-commercial use only**. 
              You may download and print worksheets for learning or teaching purposes, but:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>You may not sell or redistribute our worksheets.</li>
              <li>You may not upload them to other websites without permission.</li>
              <li>You may not claim our content as your own work.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">3. User Responsibilities</h2>
            <p>By using our platform, you agree to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Use the website in a lawful and responsible manner.</li>
              <li>Avoid any activity that may harm, disrupt, or misuse the platform.</li>
              <li>Respect copyright and usage rights of all worksheet materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">4. Content Ownership</h2>
            <p>
              All content, worksheets, images, logos, and branding are owned by <strong>WowKids Worksheets</strong>.
              Unauthorized copying or distribution is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">5. Third-Party Links</h2>
            <p>
              Our website may include links to third-party websites. We are not responsible for any content, privacy policies, or practices of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">6. Modifications</h2>
            <p>
              We may update or modify these Terms & Conditions at any time. Continued use of the platform means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">7. Contact Us</h2>
            <p>
              For any questions or concerns, feel free to contact us at:  
              <br />
              <a 
                href="mailto:support@wowkidsworksheets.com"
                className="text-blue-600 underline"
              >
                support@wowkidsworksheets.com
              </a>
            </p>
          </section>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
