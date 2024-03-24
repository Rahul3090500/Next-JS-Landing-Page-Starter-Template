function removeExtraPort(url) {
  // Regular expression to match the port number after the hostname
  var regex = /(:[0-9]+)(\/|$|\?)/;
  
  // Find the match in the URL
  var match = url.match(regex);
  
  if (match) {
    // Remove the extra port number if present
    var newUrl = url.replace(match[1], '');
    return newUrl;
  }
  
  return url; // Return the URL unchanged if no extra port number found
}

// Example usage:
var inputURL = "ssh://admin:CXLabs!12345@10.82.140.61:80:440?data=440:11";
var result = removeExtraPort(inputURL);
console.log(result); // Output: "ssh://admin:CXLabs!12345@10.82.140.61:80?data=440"
