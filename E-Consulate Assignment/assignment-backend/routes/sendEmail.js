const nodemailer = require('nodemailer');

var userEmail = ''
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mahen.2017441@iit.ac.lk',
    pass: 'LOGOUTAFTERURDONE'
  }
});

exports.function_mail = function(result){
var mailOptions = {
    from: 'mahen.2017441@iit.ac.lk',
    to: result,
    subject: 'Registration is Complete',
    text: `You have been successully registered to the system. Welcome to E-Consulate`
};
console.log(result);
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};