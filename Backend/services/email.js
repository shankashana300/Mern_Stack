const nodemailer = require("nodemailer");

const sendMail = (req, auth) => {
  const output = `
    <p>Confirm Email Address</p>
    <h3>Temporary Password</h3>
    <h1>${auth}</h1>
    <h3>Please Click on the link Below</h3>
    <a href="http://localhost:3000/ConfirmPassword/${auth}/${req.body.username}">Confirm Password</a>
    `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_EMAIL, // generated ethereal user
      pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Note Service" <NOTES APPLICATION>`, // sender address
    to: req.body.email, // list of receivers
    subject: "Confirm Password", // Subject line
    text: `${auth}`, // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

module.exports = {
  sendMail,
};
