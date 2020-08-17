// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  let firstChar = json.slice(0, 1);
  if (firstChar === '"') {
    return json.slice(1, json.length - 1);
  }

  const nullAndBooleans = {
    'null': null,
    'true': true,
    'false': false
  };

  if (nullAndBooleans[json] !== undefined) {
    return nullAndBooleans[json];
  }

  if (firstChar === '[') {
    if (json.slice(1, 2) === ']') {
      return [];
    }
    let arrayInternals = json.slice(1, json.length - 1);
    let elements = arrayInternals.split(',');
    let result = [];
    _.each(elements, function(element) {
      result.push(parseJSON(element.trim()));
    });
    return result;
  }

  if (firstChar === '{') {
    if (json.slice(1, 2) === '}') {
      return {};
    }
    // expecting 1+ key value pair
    let objInternals = json.slice(1, json.length - 1);
    let kvPairs = objInternals.split(',');
    let returnObj = {};
    _.each(kvPairs, function(pair) {
      let colonIdx = pair.indexOf(':');
      let key = parseJSON(pair.slice(0, colonIdx).trim());
      let value = parseJSON(pair.slice(colonIdx + 1).trim());
      // let value = pair.slice(colonIdx + 1).trim();
      // future iterations: pass value into parseJSON
      returnObj[key] = value;
    });
    return returnObj;
  }

};
