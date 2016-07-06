const tinder = require('tinder');

/**
 * Create tinder client
 * @param {String} id - tinder id
 * @param {String} tinderToken - tinder access token
 * @return {Object} - tinder client
 */
function getClient(id, tinderToken){

  const client = new tinder.TinderClient();

  client.setAuthToken(tinderToken);

  client.userId = id;

  return client;

}

/**
 * Create tinder client, inject into account
 * @param {Array} accounts - account list
 * @return {Array} accounts with tinderClient
 */
module.exports = function tinderClient(accounts){

  return accounts.map( account => {

    account.tinderClient = getClient(account.tinder.id, account.tinder.token);

    return account;

  });

};
