const nodemailer = require('nodemailer');
const AppError = require('../utils/appError');

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient's email address
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Email message
 */
const sendEmail = async (options) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new AppError('There was an error sending the email. Try again later!', 500);
  }
};

module.exports = sendEmail; 