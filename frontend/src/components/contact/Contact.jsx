import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/admin/contact/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
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
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-lg w-full p-10 bg-black/50 backdrop-blur-xl border border-yellow-500/20 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.4)]"
      >
        <h2
          className="text-4xl font-extrabold mb-8 text-center text-yellow-400 tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Contact Us
        </h2>

        {status && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
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
              animate={{ opacity: 1, y: 0 }}
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
                  className="w-full px-5 py-3 rounded-xl bg-black/30 border border-yellow-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-inner shadow-black/40 transition duration-300"
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
                  className="w-full px-5 py-3 rounded-xl bg-black/30 border border-yellow-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-inner shadow-black/40 resize-y transition duration-300"
                ></textarea>
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-transform duration-300"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
