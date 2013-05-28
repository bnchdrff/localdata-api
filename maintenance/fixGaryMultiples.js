/**
 * Fix an issue where checkbox questions were stored with the name "undefined"
 * - Saves the data in the format QUESTION_NAME-ANSWER_NAME
 * - Removes the undefined keys
 *
 * Usage:
 * $ mongo server:port/database_name -u username -p password fixGaryMultiples.js
 * $ mongo localhost:27017/localdata_beta  fixGaryMultiples.js
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

var renames = {
  // From => to
  'What-grade-would-you-give-the-structure--Reference-Youngstown-Vacant-Property-Survey-Grading-Sheet': 'What-grade-would-you-give-the-structure--Reference-Gary-Building-Rubric-sheet',

  'Does-the-structure-show-signs-of-fire-damage-Some-noticeable-fire-damage--burn-markings,-charred-exterior-significant--burned-out-from-within,-collapsing-portions-2': 'Does-the-structure-show-signs-of-fire-damage-Some--noticeable-burn-markings-charred-exterior-Significant--burned-out-from-within-collapsing-portions-2',

  'Does-the-structure-show-signs-of-fire-damage-Some-noticeable-fire-damage--burn-markings,-charred-exterior-significant--burned-out-from-within,-collapsing-portions': 'Does-the-structure-show-signs-of-fire-damage-Some--noticeable-burn-markings-charred-exterior-Significant--burned-out-from-within-collapsing-portions',

  'Is-the-structure-vacant-or-abandoned': 'Is-the-structure-vacantabandoned'
};


db.responseCollection.find({'survey': '8a340df0-87af-11e2-9485-c3fff44e7c8e'}).forEach(function(elt){
  if(!elt.hasOwnProperty('responses')) {
    elt.responses = {};
  }

  // Rename undefined fields above
  for (var key in pairs) {
    if (elt.responses.hasOwnProperty(key)) {
      elt.responses[ pairs[key] ] = 'yes'; // these are all multiple choice
      delete elt.responses[key];
    }
  }

  // Change the name of fields that changed because of form updates.
  for (var orig in renames) {
    if (elt.responses.hasOwnProperty(orig)) {
      elt.responses[ renames[orig] ] = elt.responses[orig];
      delete elt.responses[orig];
    }
  }


  // print(tojson(elt.responses));

  //print(tojson(elt));
  db.responseCollection.save(elt);
});

