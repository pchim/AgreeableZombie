var nodemailer = require('nodemailer');

var generateEmailHTML = function(url) {
  return `
    <div style="padding:30px; font-family: helvetica;">
      <h1 style="padding-bottom: 20px;">
        Dear Reader!
      </h1>
      <h2 style= "font-weight:100; font-family: helvetica; color:#636363;">
        Please join a friend in the <a href=${url}>reading room</a> at ReadWithMe.xyz.
      </h2>
      <h2 style="padding-top:30px;">Enjoy!</h2>
      <h2>Your friends at <a href="http://readwithme.xyz">ReadWithMe</a>.</h2>
    </div>
  `;
};

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.READTOME_EMAIL_ADDRESS,
    pass: process.env.READTOME_EMAIL_PASSWORD
  }
};

var mailOptions = {
  from: process.env.READTOME_EMAIL_ADDRESS,
  subject: 'Read To Me Invite'
};

var transporter = nodemailer.createTransport(smtpConfig);

module.exports = {
  sendEmail: function(req, res) {
    if (req.body.email && req.body.href) {
      mailOptions.to = req.body.email;
      mailOptions.html = generateEmailHTML(req.body.href);

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return console.log(error);
        }
        return res.json(info);
      });
    } else {
      res.json({ error: { message: 'no email' } });
    }
  }
};
