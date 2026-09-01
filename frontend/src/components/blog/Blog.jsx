import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Calendar, Tag, Layers } from "lucide-react";
import OptimizedImg from "../common/OptimizedImg";
import { getCachedJson, setCachedJson } from "../../utils/storageCache";

const BLOGS_CACHE_KEY = "hhh.blogs.v1";
const BLOGS_CACHE_TTL_MS = 2 * 60 * 1000;

const Blog = () => {
  const [blogs, setBlogs]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const apiBase  = import.meta.env.VITE_API_URL || "http://localhost:8080";
    const cached   = getCachedJson(BLOGS_CACHE_KEY, BLOGS_CACHE_TTL_MS);
    if (cached) { setBlogs(cached); setLoading(false); return; }

    const controller = new AbortController();
    fetch(`${apiBase.replace(/\/$/, "")}/admin/blogs`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then((data) => {
        const list   = Array.isArray(data) ? data : (data?.data ?? []);
        const sorted = [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBlogs(sorted);
        setCachedJson(BLOGS_CACHE_KEY, sorted);
        setLoading(false);
      })
      .catch((err) => { if (err?.name !== "AbortError") console.error(err); setLoading(false); });

    return () => controller.abort();
  }, []);

  const closeModal = () => setSelectedBlog(null);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#080808]">
        <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
        <p className="text-[10px] uppercase tracking-[6px] text-white/25">Loading Articles</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#D4AF37]/4 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#b8902d]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[8px] text-[#D4AF37]/60 font-medium">
              Insights & Ideas
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight mb-5">
            <span className="block text-white">Design</span>
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#e8cc72] to-[#b8902d] bg-clip-text text-transparent">
              Chronicle
            </span>
          </h1>
          <p className="text-white/35 text-sm max-w-sm mx-auto leading-relaxed">
            Perspectives on architecture, design, and the craft behind every space we create.
          </p>
          <div className="mt-7 h-px max-w-[120px] mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        </motion.div>

        {/* ── No blogs ── */}
        {blogs.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/20 text-sm tracking-widest uppercase">No articles yet</p>
          </div>
        )}

        {/* ── Blog Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.slice(0, visibleCount).map((blog, i) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
              onClick={() => setSelectedBlog(blog)}
              className="group relative bg-[#0e0e0e] border border-white/6 rounded-2xl overflow-hidden cursor-pointer hover:border-[#D4AF37]/25 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(212,175,55,0.08)]"
            >
              {/* Thumbnail */}
              {blog.thumbnail ? (
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <OptimizedImg
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-contain bg-[#0a0a0a] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/20 to-transparent" />

                  {/* Category badge on image */}
                  {blog.category && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/55 border border-white/10 backdrop-blur-sm group-hover:border-[#D4AF37]/30 transition-all duration-400">
                      <span className="text-[9px] uppercase tracking-[3px] text-white/55 group-hover:text-[#D4AF37]/80 transition-colors duration-400">
                        {blog.category}
                      </span>
                    </div>
                  )}

                  {/* Arrow — top right */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/45 border border-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-[#D4AF37]/35 transition-all duration-400">
                    <ArrowUpRight size={14} className="text-[#D4AF37]" />
                  </div>
                </div>
              ) : (
                /* No thumbnail placeholder */
                <div className="h-32 bg-gradient-to-br from-[#D4AF37]/6 to-transparent flex items-center justify-center border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[4px] text-[#D4AF37]/25">HHH Design Studio</span>
                </div>
              )}

              {/* Card body */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={11} className="text-[#D4AF37]/40" />
                  <span className="text-[10px] text-white/30 tracking-wide">
                    {formatDate(blog.created_at)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h2>

                {/* Tags */}
                {blog.tags && (
                  <div className="flex items-center gap-2 flex-wrap mb-5">
                    <Tag size={10} className="text-[#D4AF37]/35 flex-shrink-0" />
                    {(Array.isArray(blog.tags) ? blog.tags : blog.tags.split(","))
                      .slice(0, 3)
                      .map((tag, t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-full text-[8px] uppercase tracking-[2px] bg-[#D4AF37]/6 border border-[#D4AF37]/15 text-[#D4AF37]/55">
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                )}

                {/* Bottom — read more */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[3px] text-white/25 group-hover:text-[#D4AF37]/50 transition-colors duration-300">
                    Read Article
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-400">
                    <ArrowUpRight size={12} className="text-[#D4AF37] group-hover:text-black transition-colors duration-400" />
                  </div>
                </div>
              </div>

              {/* Bottom gold line on hover */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </motion.article>
          ))}
        </div>

        {/* ── Show More / Less ── */}
        {blogs.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            {visibleCount < blogs.length ? (
              <button
                onClick={() => setVisibleCount((p) => p + 4)}
                className="group flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#D4AF37]/25 text-[#D4AF37] text-sm font-bold tracking-widest uppercase hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/6 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-400"
              >
                Load More Articles
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(4)}
                className="px-8 py-3.5 rounded-full border border-white/10 text-white/30 text-sm font-bold tracking-widest uppercase hover:border-white/20 hover:text-white/50 transition-all duration-400"
              >
                Show Less
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Premium Article Modal ── */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 z-[999] bg-black/92 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#0b0b0b] border border-white/8 rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col"
            >
              {/* Gold top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent z-30" />

              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 z-40 w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/15 hover:border-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
              >
                <X size={14} className="text-white/60 hover:text-white transition-colors" />
              </button>

              {/* Thumbnail — full width on top, no cut */}
              {selectedBlog.thumbnail && (
                <div className="relative flex-shrink-0 bg-[#080808]" style={{ aspectRatio: "16/9" }}>
                  <OptimizedImg
                    src={selectedBlog.thumbnail}
                    alt={selectedBlog.title}
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/60 via-transparent to-transparent pointer-events-none" />
                  {/* Category on image */}
                  {selectedBlog.category && (
                    <div className="absolute bottom-4 left-6 flex items-center gap-2">
                      <Layers size={11} className="text-[#D4AF37]/70" />
                      <span className="text-[9px] uppercase tracking-[4px] text-[#D4AF37]/70">
                        {selectedBlog.category}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-[#D4AF37]/20 scrollbar-track-transparent">
                <div className="px-8 pt-6 pb-10">

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={11} className="text-[#D4AF37]/40" />
                    <span className="text-[10px] text-white/30 tracking-wide">
                      {formatDate(selectedBlog.created_at)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-4">
                    {selectedBlog.title}
                  </h2>

                  {/* Tags */}
                  {selectedBlog.tags && (
                    <div className="flex items-center gap-2 flex-wrap mb-6">
                      <Tag size={10} className="text-[#D4AF37]/35" />
                      {(Array.isArray(selectedBlog.tags)
                        ? selectedBlog.tags
                        : selectedBlog.tags.split(",")
                      ).map((tag, t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-[8px] uppercase tracking-[2px] bg-[#D4AF37]/8 border border-[#D4AF37]/20 text-[#D4AF37]/65">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/8 to-transparent mb-7" />

                  {/* Content — drop cap first letter */}
                  {selectedBlog.content && (
                    <div className="text-white/50 text-sm leading-[1.95]">
                      <span className="float-left mr-3 mt-1 text-5xl font-black text-[#D4AF37] leading-none select-none">
                        {selectedBlog.content.charAt(0)}
                      </span>
                      <span className="whitespace-pre-line">{selectedBlog.content.slice(1)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Gold bottom bar */}
              <div className="h-[2px] flex-shrink-0 bg-gradient-to-r from-[#D4AF37]/60 via-[#e8cc72]/30 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
