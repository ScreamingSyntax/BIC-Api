// transporterFile.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});

const mailOptions = (receiver, subject, content) => ({
    from: process.env.USER,
    to: receiver,
    subject: subject,
    text: content
});

const mailTransporter = (emailOptions)=> {
    transporter.sendMail(emailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email Sent: ' + info.response);
        }
    });
};

module.exports = { mailTransporter, mailOptions };
