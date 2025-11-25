import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FiDownload, FiPrinter } from "react-icons/fi";



const PrivacyPolicy = () => {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-yellow-50 to-sky-50 text-gray-800">
      <Navbar />

      {/* HERO */}
      <header className="relative pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-2/3">
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-pink-700"
            >
              Privacy Policy
            </motion.h1>

            <p className="mt-4 text-base md:text-lg text-gray-700 max-w-2xl">
              WowKids Worksheets is committed to protecting your privacy. This policy explains how we collect,
              use and safeguard personal information when you visit and use our website.
            </p>

            <div className="mt-6 flex gap-3">
              

             
            </div>
          </div>

          
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <article className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-xl border border-white/50">
          <section className="prose prose-lg max-w-none text-gray-700">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly when you use our site — for example when you sign up,
              upload content, subscribe to newsletters, or contact us. This may include: name, email address, and any
              other information you choose to provide.
            </p>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website we may automatically collect certain information about your device and usage,
              including IP address, browser type, operating system, referring URLs, pages viewed, and interaction data.
              We use cookies and similar technologies to collect this information. See the Cookies section below.
            </p>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To provide, maintain and improve the site and its features.</li>
              <li>To respond to your requests or inquiries and provide support.</li>
              <li>To send updates, newsletters and promotional materials (with your consent where required).</li>
              <li>To analyse site usage and improve content and features.</li>
            </ul>

            <h2>3. Cookies & Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to remember preferences, analyze site performance, and
              improve user experience. You can control cookies through your browser settings — disabling cookies may
              affect the functionality of some parts of the site.
            </p>

            <h2>4. Sharing & Disclosure</h2>
            <p>
              We do not sell your personal information. We may share information with third-party service providers who
              help us operate the website (hosting, analytics, email). These providers are only permitted to use your
              data to provide services to us and must follow strict confidentiality requirements.
            </p>

            <h2>5. Security</h2>
            <p>
              We implement reasonable administrative, technical and physical safeguards to protect user information.
              However, no system can be 100% secure — please use caution when sharing personal information online.
            </p>

            <h2>6. Children's Privacy</h2>
            <p>
              WowKids Worksheets is family-focused. We do not knowingly collect personal information from children under
              13 without parental consent. If you are a parent and you believe your child has provided us with personal
              information without your consent, please contact us and we will promptly remove that information.
            </p>

            <h2>7. Third-Party Links</h2>
            <p>
              Our site may contain links to third-party sites (for example a payment gateway or external resources).
              We are not responsible for the privacy practices of those sites. Please review their privacy policies when
              you leave our site.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we make changes, we will update the "Last
              updated" date here. Continued use of the site after changes implies acceptance of the updated policy.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have questions, concerns or requests about your data, please contact us:
            </p>
            <ul>
              <li>
                Email: <a href="mailto:support@wowkidsworksheets.com" className="text-indigo-600">support@wowkidsworksheets.com</a>
              </li>
            </ul>

            <hr />

            <p className="text-sm text-gray-600">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
