const tinder = require('tinder');

/**
 * Create tinder client
 * @param {String} id - tinder id
 * @param {String} tinderToken - tinder access token
 * @param {Number} lastActivity - last sync user pass pass
 * @return {Object} - tinder client
 */
function getClient(id, tinderToken, lastActivity){

  const client = new tinder.TinderClient();

  client.setAuthToken(tinderToken);

  client.userId = id;

  if(lastActivity){

    client.lastActivity = new Date(lastActivity);

  }

  return client;

}

/**
 * Create tinder client, inject into account
 * @param {Array} accounts - account list
 * @return {Array} accounts with tinderClient
 */
module.exports = function tinderClient(accounts){

  return accounts.map( account => {

    account.tinderClient = getClient(account.tinder.id, account.tinder.token, account.tinder.lastActivity);

    return account;

  });

};
