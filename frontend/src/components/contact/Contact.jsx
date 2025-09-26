import React, { useState } from "react";
import { motion } from "framer-motion";
import bgImg from "../../assets/contact.jpg"; 

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiBase.replace(/\/$/, '')}/admin/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", msg: data.message });
        setForm({ name: "", email: "", message: "" });
      } else {
        const errorMessages = data.errors
          ? Object.values(data.errors).join(", ")
          : "Something went wrong.";
        setStatus({ type: "error", msg: errorMessages });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Failed to connect to server." });
    }
  };

  return (
    <section className="relative min-h-screen flex mt-20 items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
  <div className="relative z-10 container mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center py-12 md:py-0">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <h2
            className="text-5xl font-extrabold mb-6 text-yellow-400"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get in Touch
          </h2>
          <p className="text-lg text-gray-200 mb-4 leading-relaxed">
            We design spaces that inspire, blending timeless elegance with
            modern functionality.  
          </p>
          <p className="text-lg text-gray-200 mb-4 leading-relaxed">
            Our team is dedicated to delivering bespoke solutions that reflect
            your personality and lifestyle.  
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            Reach out today — let’s turn your vision into a masterpiece.  
          </p>
        </motion.div>

        {/* Right Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-lg w-full p-10 bg-black/50 backdrop-blur-xl border border-yellow-500/20 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.4)]"
        >
          <h3
            className="text-3xl font-bold mb-6 text-center text-yellow-400"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Form
          </h3>

          {status && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mb-6 px-4 py-3 rounded border text-center font-medium ${
                status.type === "success"
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              }`}
              role="alert"
            >
              {status.msg}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "message"].map((field, idx) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <label
                  htmlFor={field}
                  className="block mb-2 font-medium text-gray-200"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                {field !== "message" ? (
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    placeholder={`Enter your ${field}`}
                    className="w-full px-5 py-3 rounded-xl bg-black/30 border border-yellow-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner shadow-black/40 transition duration-300"
                  />
                ) : (
                  <textarea
                    id={field}
                    name={field}
                    rows="5"
                    value={form[field]}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    className="w-full px-5 py-3 rounded-xl bg-black/30 border border-yellow-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner shadow-black/40 resize-y transition duration-300"
                  ></textarea>
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-transform duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
