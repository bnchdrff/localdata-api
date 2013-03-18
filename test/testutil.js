/*jslint node: true, indent: 2, white: true, vars: true */
/*globals suite, test, setup, suiteSetup, suiteTeardown, done, teardown */
'use strict';

var assert = require('assert');
var _ = require('lodash');
var mongo = require('mongodb');
var passport = require('passport');
var request = require('request');
var should = require('should');
var util = require('util');

var server = require('../web.js');
var settings = require('../settings-test.js');
var users = require('../users.js');
var surveys = require('../surveys.js');

var BASEURL = 'http://localhost:' + settings.port + '/api';

var userA = {
  'name': 'User A',
  "email": "a@localdata.com",
  'password': 'password'
};

var userB = {
  'name': 'User B',
  "email": "b@localdata.com",
  'password': 'drowssap'
};

/**
 * Remove all results from a collection
 * @param  {String}   collection Name of the collection
 * @param  {Function} done       Callback, accepts error, response
 */
var clearCollection = function(collectionName, done) {
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

/**
 * Clear the user collection and create two test users.
 * @param  {Function} done  Params (userAJar, userBJar)
 */
var setupUsers = function(done) {
  var url = BASEURL + '/user';
  var userAJar = request.jar();
  var userBJar = request.jar();

  // Clear the collection so we start with a blank slate
  clearCollection('usersCollection', function(error, response){

    // Create the first user
    request.post({url: url, json: userA, jar: userAJar}, function (error, response, body) {
      should.not.exist(error);
      userA._id = body._id;

      // Create the second user
      request.post({url: url, json: userB, jar: userBJar}, function (error, response, body) {
        should.not.exist(error);
        userB._id = body._id;
        console.log("Created user", body);
        console.log(error);

        done(userAJar, userBJar);
      });

    });
  });
};


module.exports = {
  setupUsers: setupUsers,
  clearCollection: clearCollection,
  userA: userA,
  userB: userB
};
