const userIds = require('./userIds');
const accounts = require('./accounts');
const tinderClient = require('./tinderClient');

/**
 * Extract unique profiles from pass pass match and complete it
 * @param {Array} passPassMatches - pass pass matches
 * @return {Array} - uniques completes profiles
 */
module.exports = function uniqueProfile(passPassMatches){

  const uniqueUsersFbIds = userIds(passPassMatches);
  const uniqueAccounts = accounts(uniqueUsersFbIds);

  return tinderClient(uniqueAccounts);

};
