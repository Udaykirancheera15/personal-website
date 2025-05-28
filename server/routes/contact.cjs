const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const router = express.Router();

// POST /api/contact
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.warn('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Please fix the following errors:',
        errors: errors.array(),
      });
    }

    const { name, email, subject, message } = req.body;
    console.log('📧 Contact form submission received:', req.body);

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        logger: true,
        debug: true,
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `Portfolio Contact Form: ${subject}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br>${message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully');

      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully!',
      });
    } catch (err) {
      console.error('❌ Email sending failed:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    }
  }
);

module.exports = router;

