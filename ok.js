function replacePorts(text) {
  // Define the regular expression to match port numbers preceded by a colon
  const pattern = /:\d{1,5}/g;
  
  // Find all matches of the pattern in the text
  const matches = text.match(pattern);

  // If there are matches, remove all but the first one
  if (matches && matches.length > 1) {
      for (let i = 1; i < matches.length; i++) {
          // Replace each matched port with an empty string
          text = text.replace(matches[i], "");
      }
  }


  return text;
}


console.log(replacePorts("ftp://localhost:400?data=400") )