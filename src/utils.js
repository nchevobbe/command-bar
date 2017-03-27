const accentuatedChars = {
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "Ç": "C",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "Ÿ": "Y",
  "Ñ": "N"
};

function replaceAccentuatedChars(text) {
  if (!text || text === "") {
    return text;
  }

  //on remplace les caractères accentués par leur équivalent sans accent
  var tmp_text = text.replace(new RegExp("[" + Object.keys(accentuatedChars).join("") + "]", "gi"), function(str, p1, offset, s) {
    return accentuatedChars[str.toUpperCase()];
  }).toUpperCase();
  //on remplace les autres caractères spéciaux par chaîne vide
  return tmp_text.replace(/[^a-zA-Z0-9]/g, '');
}

function throttle(fn, interval) {
  // hold a lastCall reference
  let lastCallTime;
  let timeoutId;
  // We want to return a function
  return function(...args) {
    // clearing whatever timeout we have
    // if the call wasn't within the interval
    // the function has been called
    clearTimeout(timeoutId);
    let callTime = Date.now();
    // if the function haven't been called yet
    // or if it was called more than "interval" ago
    if(!lastCallTime || callTime - lastCallTime > interval ) {
      // we assign current call time to lastCallTime
      lastCallTime = callTime;
      // and call the function
      fn.apply(this, args);
    } else {
      // if the call was made not so long ago
      // we set a timeout for the current call
      // in order to always call the "last" action
      timeoutId = setTimeout(_ => fn.apply(this, args), interval);
    }
  }
}

export default {
  replaceAccentuatedChars,
  throttle,
};
