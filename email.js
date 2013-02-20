/*jslint node: true */
'use strict';

var nodemailer = require("nodemailer");
var settings = require("./settings.js");

var mailer = module.exports;

var transport = nodemailer.createTransport("SES", {
  AWSAccessKeyID: settings.aws_key,
  AWSSecretKey: settings.aws_secret
});


/**
 * Send an email
 * @param  {String}   to      To address; '"Matt Hampel" <matth@localdata.com>'
 *                            or just 'matth@localdata.com'
 * @param  {String}   subject
 * @param  {String}   text    Text body for the email
 * @param  {Function} done    Optional error parameter
 */
mailer.send = function(to, subject, text, done) {
  var message = {
    from: 'LocalData <support@localdata.com>',
    
    // Comma separated list of recipients
    to: to,
    
    // Subject of the message
    subject: subject,

    // plaintext body
    text: text
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

