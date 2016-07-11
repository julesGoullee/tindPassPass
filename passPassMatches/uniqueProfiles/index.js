const log = require('npmlog');
const colors = require('colors/safe');
const userIds = require('./userIds');
const accounts = require('./accounts');
const tinderClient = require('./tinderClient');

/**
 * Extract unique profiles from pass pass match and complete it
 * @param {Array} passPassMatches - pass pass matches
 * @return {Array} - uniques completes profiles
 */
module.exports = function uniqueProfile(passPassMatches){

  log.info('step', colors.yellow.bold('get unique profiles and create tinderClient......') );

  const uniqueUsersFbIds = userIds(passPassMatches);
  const uniqueAccounts = accounts(uniqueUsersFbIds);
  const uniqueAccountsWithTinderClient = tinderClient(uniqueAccounts);

  log.info('step', colors.yellow.bold(`unique profiles & tinder client success with ${uniqueAccountsWithTinderClient.length} accounts!`) );

  return uniqueAccountsWithTinderClient;

};
