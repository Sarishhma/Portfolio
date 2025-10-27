import React, { useState } from 'react';
import './Chat.css'

function Chat() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      // FIXED: Remove trailing slash
      const backendUrl = 'https://protfolio-nextjs-ecru.vercel.app';
      const apiUrl = `${backendUrl}/api/send`;
      
      console.log('🔄 Sending request to:', apiUrl);
      console.log('📦 Request data:', formData);

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📡 Response status:', res.status);

      if (!res.ok) {
        // Get more details about the error
        const errorText = await res.text();
        console.log('📡 Error response:', errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log('✅ Success response:', data);

      setStatus('✅ Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });

    } catch (err) {
      console.error('❌ Detailed error:', err);
      
      if (err.message.includes('Failed to fetch')) {
        setStatus('❌ Network error: Cannot connect to server. This might be a CORS issue.');
      } else if (err.message.includes('404')) {
        setStatus('❌ API endpoint not found (404). The /api/send endpoint does not exist.');
      } else {
        setStatus(`❌ Failed: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='All'>
      <div className='first-container'>
        <h1>Contact & Chat</h1>
        <p>Get in touch with me or chat in real-time</p>
        
        <div className='chat-container'>
          <form onSubmit={handleSubmit}>
            <input 
              name="name" 
              placeholder="Your Name" 
              onChange={handleChange} 
              value={formData.name} 
              required 
              disabled={isLoading}
            />
            <input 
              name="email" 
              type="email"
              placeholder="Your Email" 
              onChange={handleChange} 
              value={formData.email} 
              required 
              disabled={isLoading}
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              onChange={handleChange} 
              value={formData.message} 
              required 
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
            <p className={status.includes('✅') ? 'success' : 'error'}>
              {status}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;