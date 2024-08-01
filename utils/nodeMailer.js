const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

/**
 * Send an email with the provided options.
 * @param {Object} mailOptions - The mail options including 'to', 'subject', and 'text'.
 * @returns {Promise} - A promise that resolves if the email is sent successfully.
 */
const sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return reject(error);
      }
      console.log("Email sent:", info.response);
      resolve(info);
    });
  });
};

module.exports = { sendMail };
