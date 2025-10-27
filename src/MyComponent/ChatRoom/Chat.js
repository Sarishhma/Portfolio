import React, { useState } from 'react';
import './Chat.css'

function Chat() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setStatus(data.message);
    } catch (err) {
      setStatus('Failed to send message.');
    }

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div 
      className='All'
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-once="true"
    >
      <div className='first-container'>
        <h1
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="200"
          data-aos-once="true"
        >
          Contact & Chat
        </h1>
        <p
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="300"
          data-aos-once="true"
        >
          Get in touch with me or chat in real-time
        </p>
        
        <div 
          className='chat-container'
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="400"
          data-aos-once="true"
        >
          <form onSubmit={handleSubmit}>
            <input 
              name="name" 
              placeholder="Your Name" 
              onChange={handleChange} 
              value={formData.name} 
              required 
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="500"
              data-aos-once="true"
            />
            <input 
              name="email" 
              placeholder="Your Email" 
              onChange={handleChange} 
              value={formData.email} 
              required 
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="600"
              data-aos-once="true"
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              onChange={handleChange} 
              value={formData.message} 
              required 
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="700"
              data-aos-once="true"
            />
            <button 
              type="submit"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="800"
              data-aos-once="true"
            >
              Send
            </button>
            <p
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="900"
              data-aos-once="true"
            >
              {status}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;