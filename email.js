/*jslint node: true */
'use strict';

var nodemailer = require("nodemailer");
var settings = require("./settings.js");

var mailer = module.exports;

var transport = nodemailer.createTransport("SES", {
  AWSAccessKeyID: settings.aws_key,
  AWSSecretKey: settings.aws_secret
});

// TODO: Use DKIM
// transport.useDKIM({
//     domainName: "localdata.com",
//     keySelector: "dkimselector",
//     privateKey: fs.readFileSync("private_key.pem")
// });

/**
 * Send an email
 * @param  {Object}   options Options: to, subject, text; all strings
 * @param  {Function} done    Optional error parameter
 */
mailer.send = function(options, done) {
  var message = {
    from: 'LocalData <support@localdata.com>',
    
    // Comma separated list of recipients
    to: options.to,
    
    // Subject of the message
    subject: options.subject,

    // plaintext body
    text: options.text
  };

  transport.sendMail(message, function(error){
    if(error){
        console.log('Error occured');
        console.log(error.message);
        done(error);
        return;
    }
    console.log('Message sent successfully!');
    done();
  });
};

