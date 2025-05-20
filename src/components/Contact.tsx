import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const USER_ID = 'YOUR_PUBLIC_KEY';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!form.current) return;
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
      .then(() => {
        setSent(true);
        setLoading(false);
      }, () => {
        setLoading(false);
        alert('Error sending message. Please try again.');
      });
  };

  return (
    <div className="contact-container">
      <motion.h2 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>Contact Me</motion.h2>
      <motion.form
        ref={form}
        className="contact-form"
        onSubmit={sendEmail}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required rows={5} />
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
        {sent && <span className="success-msg">Thank you! Your message has been sent.</span>}
      </motion.form>
    </div>
  );
};

export default Contact; 