import React, { useEffect, useState } from 'react';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/admin/projects', {
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (data.status) {
                    setProjects(data.data); // your controller returns { status: true, data: projects }
                } else {
                    setError('Failed to load projects');
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || 'Something went wrong');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Projects</h2>
            {projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                projects.map((project) => (
                    <div key={project.id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <p>Status: {project.status}</p>
                        <div>
                            {project.images && project.images.length > 0 ? (
                                project.images.map((img) => (
                                    <img
                                        key={img.id}
                                        src={`http://localhost:8080/${img.image_url}`}
                                        alt={img.caption || 'Project image'}
                                        style={{ width: 100, marginRight: 10 }}
                                    />
                                ))
                            ) : (
                                <p>No images available.</p>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Project;
