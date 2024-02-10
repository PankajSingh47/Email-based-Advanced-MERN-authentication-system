const nodemailer = require("nodemailer");
const mailjet = require("nodemailer-mailjet-transport");

const sendEmail = (options) => {
  // Create a Mailjet transport
  const transporter = nodemailer.createTransport(
    mailjet({
      auth: {
        apiKey: process.env.MJ_APIKEY_PUBLIC,
        apiSecret: process.env.MJ_APIKEY_PRIVATE,
      },
    })
  );

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info);
    }
  });
};

module.exports = sendEmail;
