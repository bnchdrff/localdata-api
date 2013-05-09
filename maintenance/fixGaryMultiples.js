/*
 * Maintenance script to create geospatial index on the geo_info.centroid property
 * geo_info.centroid should be in the format [float lat, float lng]
 * This script also does some minor updates to make sure existing objects fit
 *  that format.
 *
 * Usage:
 * $ mongo server:port/database_name -u username -p password fixGaryMultiples.js
 *
 */

var pairs = {
	'undefined-16': "Is-there-dumping-on-the-site-Yes,-dumping-on-site",
	'undefined-15': "Mark-all-that-apply-Basement-windows",
	'undefined-14': "Mark-all-that-apply-Concrete-slab",
	'undefined-13': "Mark-all-that-apply-Attachments-garage-or-additional-structure-",
	'undefined-12': "Mark-all-that-apply-Obstructed-entrance",
	'undefined-11': "Mark-all-that-apply-Bars-on-windows",
	'undefined-10': "Mark-all-that-apply-2-stories",
	'undefined-9': "What-type-of-building-is-it-Multi_family",
	'undefined-8': "What-type-of-building-is-it-Single_family",
	'undefined-7': "What-type-of-building-is-it-Publicgovernment",
	'undefined-6': "What-type-of-building-is-it-Commercial",
	'undefined-5': "What-type-of-building-is-it-Residential",
	'undefined-4': "What-is-the-exterior-material-Siding",
	'undefined-3': "What-is-the-exterior-material-Wood",
	'undefined-2': "What-is-the-exterior-material-Stone",
	'undefined':   "What-is-the-exterior-material-Brick"
};

db.responseCollection.find({'survey': '8a340df0-87af-11e2-9485-c3fff44e7c8e'}).forEach(function(elt){

	for (var key in pairs) {
    if (elt.responses.hasOwnProperty(key)) {
      elt.responses[ pairs[key] ] = 'yes'
      delete elt.responses[key];
    }
  }

  print(tojson(elt.responses));

  //print(tojson(elt));
  db.responseCollection.save(elt);
});

