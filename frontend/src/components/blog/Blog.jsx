import React, { useEffect, useState } from 'react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/admin/blogs', {
      headers: {
        'Accept': 'application/json', // Trigger API response
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch blogs');
        return res.json();
      })
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Latest Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <h2>{blog.title}</h2>
            {blog.thumbnail && (
              <img
                src={blog.thumbnail}
                alt={blog.title}
                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
              />
            )}
            <p><strong>Category:</strong> {blog.category || 'N/A'}</p>
            <p><strong>Tags:</strong> {blog.tags || 'N/A'}</p>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;
