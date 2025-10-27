import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

function Chat() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-20px',
      }
    );

    if (chatRef.current) {
      observer.observe(chatRef.current);
    }

    return () => {
      if (chatRef.current) {
        observer.unobserve(chatRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Sending...');

    try {
      const backendUrl = 'https://protfolio-nextjs-ecru.vercel.app';
      const apiUrl = `${backendUrl}/api/send`;
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });

    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        setStatus('Network error: Cannot connect to server.');
      } else if (err.message.includes('404')) {
        setStatus('API endpoint not found (404).');
      } else {
        setStatus(`Failed: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='contact-section' ref={chatRef}>
      <div className='contact-header'>
        <h2 className={`title-reveal ${isVisible ? 'revealed' : ''}`}>Get In Touch</h2>
        <p className={`subtitle-reveal ${isVisible ? 'revealed' : ''}`}>
          Let's discuss your project
        </p>
      </div>
      
      <div className={`contact-form ${isVisible ? 'revealed' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              name="name" 
              placeholder="Your Name" 
              onChange={handleChange} 
              value={formData.name} 
              required 
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <input 
              name="email" 
              type="email"
              placeholder="Your Email" 
              onChange={handleChange} 
              value={formData.email} 
              required 
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <textarea 
              name="message" 
              placeholder="Your Message" 
              onChange={handleChange} 
              value={formData.message} 
              required 
              disabled={isLoading}
              rows="4"
            />
          </div>
          
          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
          
          {status && (
            <p className={`status ${status.includes('successfully') ? 'success' : 'error'}`}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Chat;