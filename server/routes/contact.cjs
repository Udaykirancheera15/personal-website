/**
 * Contact form routes
 * Handles sending emails for the contact form
 */
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configuration for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other services too
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // This should be an app password if you use Gmail
  }
});

// Contact form submission endpoint
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'cheeraudaykiran@gmail.com', // Your receiving email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New message from your portfolio website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
