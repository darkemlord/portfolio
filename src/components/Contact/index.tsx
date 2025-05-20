import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };
  
  return (
    <div className="contact-container">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        Contact Me
      </motion.h2>
      
      {isSubmitted ? (
        <motion.p 
          className="success-msg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Thank you for your message! I'll get back to you soon.
        </motion.p>
      ) : (
        <motion.form 
          className="contact-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          onSubmit={handleSubmit}
        >
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            required 
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            rows={5} 
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default Contact; 