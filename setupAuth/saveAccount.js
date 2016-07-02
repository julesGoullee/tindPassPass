const colors = require('colors/safe');
const path = require('path');
const jsonfile = require('jsonfile');
const pathFile = './data/accounts.json';
const accounts = require(path.resolve(pathFile) );

/**
 * Create or update account list in file
 * @param {String} fbId - fb id
 * @param {Object} tinderProfile - tinder profile
 */
function createOrUpdate(fbId, tinderProfile){

  const exitingAccount = accounts.find( (account) => account.fbId === fbId);

  if(exitingAccount){

    exitingAccount.tinderProfile = tinderProfile;

  } else{

  accounts.push({
    'fbId': fbId,
    'tinderProfile': tinderProfile
  });

  }

}

/**
 * Write user account in file
 * @param {String} fbId - user fb id
 * @param {Object} tinderProfile - user tinder profile
 * @return {Promise} when file write
 */
module.exports = function saveAccount(fbId, tinderProfile){

  return new Promise( (resolve, reject) => {

    console.log(colors.gray.bold('Save account...... \n\n') );

    createOrUpdate(fbId, tinderProfile);

    jsonfile.writeFile(pathFile, accounts, { 'spaces': 2 }, err => {

      if(err){

        return reject(err);

      }

      console.log(colors.gray.bold('Save account success ! \n\n') );

      resolve();

    });

  });

};
