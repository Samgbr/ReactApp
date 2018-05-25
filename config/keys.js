//Keys.js - figure out what set of credentials to returns
if (process.env.NODE_ENV === 'production') {
  //We are in production - return the prod set of keys
module.exports = require('./prod');
} else {
  //We are in developemnt return dev keys
  module.exports = require('./dev');  // get the keys from dev.js
}
