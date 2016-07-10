const fbToken = require('../fbToken');
const fbId = require('../fbId');
const tinderToken = require('../tinderToken');
const tinderProfile = require('../tinderProfile');
const saveAccount = require('../saveAccount');
const decode = require('./decode');

/**
 * Setup account common flow
 * @param {String} email - user fb email
 * @param {String} pass - user fb pass
 * @return {Promise} when end
 */
module.exports = function setupCommon(email, pass){

  let saveFb = { email, pass };

  return fbToken(decode(email), decode(pass) )
    .then(fbData => {

      saveFb.token = fbData.token;
      saveFb.expireIn = fbData.expireIn;

      return fbId(saveFb.token);

    })
    .then(id => {

      saveFb.id = id;

      return tinderToken(saveFb.token, saveFb.id);

    })
    .then(token => tinderProfile(token) )
    .then(profile => saveAccount(saveFb, profile) );

};
