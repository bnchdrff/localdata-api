/*jslint node: true */
'use strict';

var settings = module.exports;

// Are we in debug mode?
settings.secret = process.env.SECRET;

// Email settings
settings.email = {};
settings.email.from = 'LocalData <support@localdata.com>';

// MongoDB
settings.mongo_host = process.env.MONGO_HOST || 'localhost';
settings.mongo_port = parseInt(process.env.MONGO_PORT, 10);
if (isNaN(settings.mongo_port)) { settings.mongo_port = 27017; }
settings.mongo_db = process.env.MONGO_DB || 'scratchdb';
settings.mongo_user = process.env.MONGO_USER;
settings.mongo_password = process.env.MONGO_PASSWORD;
settings.mongo_native_parser = false;
if (process.env.MONGO_NATIVE_PARSER !== undefined && process.env.MONGO_NATIVE_PARSER.toLowerCase() === 'true') {
  settings.mongo_native_parser = true;
}

// AWS
settings.aws_key = process.env.AWS_KEY;
settings.aws_secret = process.env.AWS_SECRET;

// S3
settings.s3_key = process.env.S3_KEY;
settings.s3_secret = process.env.S3_SECRET;
settings.s3_bucket = process.env.S3_BUCKET;
settings.s3_dir = process.env.S3_UPLOAD_DIR;

// Postgresql parcel server
settings.psqlHost = process.env.PSQL_HOST;
settings.psqlName = process.env.PSQL_NAME;
settings.psqlUser = process.env.PSQL_USER;
settings.psqlPass = process.env.PSQL_PASS;

// Static apps
settings.mobilePrefix = process.env.REMOTE_MOBILE_PREFIX;
settings.adminPrefix = process.env.REMOTE_ADMIN_PREFIX;

settings.SESSION_SECRET = process.env.SESSION_SECRET;

// Shapefile conversion service
settings.converterBase = process.env.CONVERTER_BASE;

// Tile rendering service
settings.tileBase = process.env.TILESERVER_BASE;

// Web server
settings.port = process.env.PORT || 3000;
