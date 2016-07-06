const accounts = require('../../data/accounts');

function getUserAccount(fbId){

  const account = accounts.find( account => account.fb.id === fbId);

  if(typeof account === 'undefined'){

    throw Error(`Account ${fbId} not found`);

  }

  return account;

}

module.exports = function usersAccounts(usersId){

  return usersId.map( userId => getUserAccount(userId) );

};
