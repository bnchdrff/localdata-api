/*jslint node: true, indent: 2, white: true, vars: true */
/*globals suite, test, setup, suiteSetup, suiteTeardown, done, teardown */
'use strict';

var server = require('../web.js');
var assert = require('assert');
var util = require('util');
var request = require('request');
var should = require('should');

var settings = require('../settings-test.js');
var users = require('../users.js');
var surveys = require('../surveys.js');

var passport = require('passport');

var exports = {};

/**
 * Remove all results from a collection
 * @param  {String}   collection Name of the collection
 * @param  {Function} done       Callback, accepts error, response
 */
exports.clearCollection = function(collectionName, done) {
  var db = new mongo.Db(settings.mongo_db, new mongo.Server(settings.mongo_host,
                                                        settings.mongo_port,
                                                        {}), { w: 1, safe: true });

  db.open(function() {
    db.collection(collectionName, function(error, collection) {
      if(error) {
        console.log("BIG ERROR");
        console.log(error);
        assert(false);
        done(error);
      }

      // Remove all the things!
      collection.remove({}, function(error, response){
        done(error, response);
      });
    });

  });
};
