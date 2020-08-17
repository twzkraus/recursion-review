// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (obj === null) {
    return 'null';
  }

  if (typeof obj === 'string') {
    return `"${obj}"`;
  }

  if (Array.isArray(obj)) {

    if (obj.length === 0) {
      return '[]';
    }

    let stringInternals = '';

    _.each(obj, function(elem) {
      stringInternals += stringifyJSON(elem) + ',';
    });

    if (stringInternals.length >= 2) {
      stringInternals = stringInternals.slice(0, stringInternals.length - 1);
    }
    return '[' + stringInternals + ']';
  }

  if (typeof obj === 'object') {
    if (obj.length === 0) {
      return '{}';
    }

    let objInternals = '';

    _.each(obj, function(val, key) {
      if (!(typeof val === 'function' || val === undefined)) {
        objInternals += `"${key}":${stringifyJSON(val)},`;
      }
    });

    if (objInternals.length >= 2) {
      objInternals = objInternals.slice(0, objInternals.length - 1);
    }
    return '{' + objInternals + '}';
  }

  return obj + '';
};
