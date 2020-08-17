// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  var elements = [];

  var getElementsWithContext = function(className, scope) {
    if (scope.classList && scope.classList.value.includes(className)) {
      elements.push(scope);
    }
    if (scope.childNodes) {
      _.each(scope.childNodes, function(node) {
        getElementsWithContext(className, node);
      });
    }
    return elements;
  };

  return getElementsWithContext(className, document.body);
};

