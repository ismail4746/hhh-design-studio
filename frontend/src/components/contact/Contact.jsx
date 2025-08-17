import React, { useState } from 'react';

const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/admin/contact/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });


            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', msg: data.message });
                setForm({ name: '', email: '', message: '' });
            } else {
                const errorMessages = data.errors
                    ? Object.values(data.errors).join(', ')
                    : 'Something went wrong.';
                setStatus({ type: 'error', msg: errorMessages });
            }
        } catch (err) {
            setStatus({ type: 'error', msg: 'Failed to connect to server.' });
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg font-sans">
            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Contact Us</h2>

            {status && (
                <div
                    className={`mb-6 px-4 py-3 rounded border ${status.type === 'success'
                        ? 'bg-green-100 border-green-400 text-green-700'
                        : 'bg-red-100 border-red-400 text-red-700'
                        }`}
                    role="alert"
                >
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Write your message here..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
