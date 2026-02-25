import React, { useState } from 'react';


import MainNavbar from './MainNavbar'; // Assuming MainNavbar is the file where the navbar component is defined
const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Message sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div>
        <MainNavbar />
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8f9fa'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          padding: '40px',
          width: '400px',
          maxWidth: '90vw',
          border: '1px solid #f0f0f0'
        }}
      >
        <h2 style={{
          textAlign: 'center',
          fontWeight: 700,
          marginBottom: '8px'
        }}>Contact Us</h2>
        <p style={{
          textAlign: 'center',
          color: '#222',
          fontWeight: 500,
          marginBottom: '28px'
        }}>Get in touch for corporate training</p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '18px',
            borderRadius: '6px',
            border: '1px solid #e0e0e0',
            fontSize: '16px'
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '18px',
            borderRadius: '6px',
            border: '1px solid #e0e0e0',
            fontSize: '16px'
          }}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '28px',
            borderRadius: '6px',
            border: '1px solid #e0e0e0',
            fontSize: '16px',
            resize: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            background: '#02307d',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 0',
            fontSize: '17px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Send Massage
        </button>
      </form>
    </div>
    </div>
  );
};

export default ContactUs;