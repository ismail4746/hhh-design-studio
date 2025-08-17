import React, { useEffect, useState } from 'react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4); // Initially 4 to fill 2 per row

  useEffect(() => {
    fetch('http://localhost:8080/admin/blogs', {
      headers: { Accept: 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch blogs');
        return res.json();
      })
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBlogs(sorted);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const showMore = () => setVisibleCount(prev => prev + 4); // Load next 4

  if (loading) return <p className="p-5 text-gray-500">Loading blogs...</p>;

  return (
    <div className="min-h-screen p-10 font-sans bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl dark:text-white font-bold border-b-4 border-blue-500 dark:border-red-500 pb-2">
          Latest Blogs
        </h1>
      </div>

      {/* Blogs Grid */}
      {blogs.length === 0 ? (
        <p className="text-lg text-gray-400">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.slice(0, visibleCount).map(blog => (
            <div
              key={blog.id}
              className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              {/* Left: Thumbnail */}
              {blog.thumbnail && (
                <div className="md:w-1/2 relative overflow-hidden group">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-40 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              )}

              {/* Right: Content */}
              <div className="md:w-1/2 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{blog.title}</h2>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Category:</span> {blog.category || 'N/A'}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Tags:</span> {blog.tags || 'N/A'}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4">{blog.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show More Button */}
      {visibleCount < blogs.length && (
        <div className="text-center mt-8">
          <button
            onClick={showMore}
            className="bg-blue-600 dark:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
