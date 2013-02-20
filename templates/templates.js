/*jslint node: true */
'use strict';

var ejs = require('ejs');
var fs = require('fs');

var templates = module.exports;

templates.forgotPassword = 'email/forgotPassword.ejs';

templates.render = function(template, options) {
  var path = './' + templates[template];
	fs.readFile(path, function(err, data) {
    if (err) {
      // TODO:
      // Log errors
    }
    return ejs.compile(data, options);
  });
};