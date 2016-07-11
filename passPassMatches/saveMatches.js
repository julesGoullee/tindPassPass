const log = require('npmlog');
const colors = require('colors/safe');
const jsonfile = require('jsonfile');
const path = require('path');
const consts = require('../config/consts');
const pathPassPassMatchesFile = path.resolve(path.join(consts.DATA_PATH, '/passPassMatches.json') );

/**
 * Create or match props for save in file
 * @param {Object} passPassMatch - fb fbProfile
 * @return {Object} clean match props
 */
function createOrUpdate(passPassMatch) {

  let currentMatch = {
    'user1': {},
    'user2': {}
  };

  currentMatch.user1.lastSyncDate = passPassMatch.user1.profile.lastSync;
  currentMatch.user2.lastSyncDate = passPassMatch.user2.profile.lastSync;
  currentMatch.user1.matchId = passPassMatch.user1.matchId;
  currentMatch.user2.matchId = passPassMatch.user2.matchId;
  currentMatch.user1.fbId = passPassMatch.user1.fbId;
  currentMatch.user2.fbId = passPassMatch.user2.fbId;

  return currentMatch;
  
}

/**
 * Write matches in file
 * @return {Promise} when file write
 */
module.exports = function saveMatches(passPassMatches){

  return new Promise( (resolve, reject) => {

    log.info('step', colors.gray.bold('Save matches...... \n\n') );

    const passPassMatchesData = passPassMatches.map(passPassMatch => createOrUpdate(passPassMatch));

    jsonfile.writeFile(pathPassPassMatchesFile, passPassMatchesData, { 'spaces': 2 }, err => {

      if(err){

        return reject(err);

      }

      log.info('step', colors.gray.bold(`Save pass pass matches success with ${passPassMatches.length} matches! \n\n`) );

      resolve();

    });

  });

};