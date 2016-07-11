const log = require('npmlog');
const colors = require('colors/safe');
const path = require('path');
const cloneDeep = require('lodash/cloneDeep');
const jsonfile = require('jsonfile');
const consts = require('../config/consts');
const pathFile = path.resolve(path.join(consts.DATA_PATH, '/accounts.json') );
const accountsFile = require(pathFile);
const accounts = cloneDeep(accountsFile);

/**
 * Create or update account list in file
 * @param {Object} fbProfile - fb fbProfile
 * @param {Object} tinderProfile - tinder profile
 */
function createOrUpdate(fbProfile, tinderProfile){

  const exitingAccount = accounts.find( (account) => account.fb.email === fbProfile.email && account.fb.pass === fbProfile.pass);

  if(exitingAccount){

    Object.assign(exitingAccount.tinder, tinderProfile);
    Object.assign(exitingAccount.fb, fbProfile);

  } else{

    accounts.push({
      'fb': fbProfile,
      'tinder': tinderProfile
    });

  }

}

/**
 * Write user account in file
 * @param {Object} fbProfile - fb profile
 * @param {Object} tinderProfile - user tinder profile
 * @return {Promise} when file write
 */
module.exports = function saveAccount(fbProfile, tinderProfile){

  return new Promise( (resolve, reject) => {

    log.info('step', colors.gray.bold(`Save account ${fbProfile.id} ......`) );

    createOrUpdate(fbProfile, tinderProfile);

    jsonfile.writeFile(pathFile, accounts, { 'spaces': 2 }, err => {

      if(err){

        return reject(err);

      }

      log.info('step', colors.gray.bold(`save account ${fbProfile.id} success !`) );

      resolve();

    });

  });

};
