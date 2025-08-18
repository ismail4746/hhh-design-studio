import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(2);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/admin/blogs", {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setBlogs(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const showMore = () => setVisibleCount((prev) => prev + 2);
  const closeModal = () => setSelectedBlog(null);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f0f0f]">
        <p className="text-gray-500 animate-pulse">Loading Blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gradient-to-tr from-black via-[#0a1f3f]/50 to-[#02101f]">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent inline-block">Latest Blogs</h1>
        <div className="w-24 mx-auto mt-2 h-[3px] rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d]" />
      </div>

      {/* Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {blogs.slice(0, visibleCount).map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false}}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden bg-[#2b2b2b] border border-[#3d3d3d] shadow-xl transition hover:-translate-y-3 hover:shadow-2xl duration-500"
          >
            {blog.thumbnail && (
              <img src={blog.thumbnail} alt={blog.title} className="w-full h-60 object-cover" />
            )}

            <div className="p-6 space-y-3">
              <p className="text-xs text-gray-400">
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h2 className="text-lg font-semibold text-white leading-snug">{blog.title}</h2>
              <p className="text-xs uppercase text-gray-400">
                  Category: {blog.category || "N/A"} | Tags: {blog.tags || "N/A"}
                </p>
              
              <button
                onClick={() => setSelectedBlog(blog)}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-400 text-white text-xs hover:bg-white hover:text-black transition"
              >
                Read more <span>➝</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More / Less */}
      <div className="text-center mt-14">
        {visibleCount < blogs.length ? (
          <button
            onClick={showMore}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-white font-medium tracking-wide hover:scale-105 hover:shadow-[0_0_30px_#D4AF37]/50 transition"
          >
            Show More
          </button>
        ) : (
          <button
            onClick={() => setVisibleCount(2)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#b8902d] to-[#D4AF37] text-white font-medium tracking-wide hover:scale-105 hover:shadow-[0_0_30px_#D4AF37]/50 transition"
          >
            Show Less
          </button>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black/70 p-4 z-[999]"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-[#2b2b2b] max-w-xl w-full rounded-xl overflow-hidden"
            >
              {/* modal image */}
              {selectedBlog.thumbnail && (
                <img src={selectedBlog.thumbnail} alt="" className="w-full h-64 object-cover" />
              )}

              <div className="p-6 space-y-3 text-white">
                <h2 className="text-2xl font-bold">{selectedBlog.title}</h2>
                <p className="text-xs uppercase text-gray-400">
                  Category: {selectedBlog.category || "N/A"} | Tags: {selectedBlog.tags || "N/A"}
                </p>
                <p className="text-gray-300 text-sm">{selectedBlog.content}</p>

                <button
                  onClick={closeModal}
                  className="mt-5 inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold hover:opacity-90 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
