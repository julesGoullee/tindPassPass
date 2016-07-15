const path = require('path');
const cloneDeep = require('lodash/cloneDeep');
const consts = require('../../config/consts');
const accounts = cloneDeep(require(path.resolve( path.join(consts.DATA_PATH, '/accounts') )) );

/**
 * Find user by fbId or throw error
 * @param {String} fbId - user fb id
 * @return {Object} - user profile
 */
function getUserAccount(fbId){

  const account = accounts.find( account => account.fb.id === fbId);

  if(typeof account === 'undefined'){

    throw Error(`Account ${fbId} not found`);

  }

  return account;

}

/**
 * Find users by fbId
 * @param {Array} usersId - list of users fb id
 * @return {Array} - user profiles is in list
 */
module.exports = function usersAccounts(usersId){

  return usersId.map( userId => getUserAccount(userId) );

};
