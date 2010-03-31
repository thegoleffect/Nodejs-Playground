var sys = require('sys');

exports.router = function(needle, haystack, callback){
  // convert this to listener format so it gets added to the eventloop
  var response = (typeof haystack[needle] == "undefined")?false:haystack[needle];
  callback(response);
}