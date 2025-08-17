import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Ab yahan proxy ka use ho raha hai
        const res = await fetch("/api/admin/blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        // Agar backend data array me bhej raha hai
        const blogs = Array.isArray(data) ? data : data.data;
        setPosts(blogs || []);
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">⚠ {error}</p>;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
          Latest Blogs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {post.content?.slice(0, 150)}...
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
