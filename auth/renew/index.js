const decode = require('../setup/decode');
const fbToken = require('../fbToken');
const tinderToken = require('../tinderToken');
const saveAccount = require('../saveAccount');

/**
 * Renew fb token and tinder token and save
 * @param {String} email - user fb email encoded
 * @param {String} pass - user fb pass encoded
 * @param {String} fbId - user fb id
 * @return {Promise} when token renew and save
 */
module.exports = function renew(email, pass, fbId){

  return new Promise( (resolve, reject) => {

    let saveFb = { email, pass };
    let saveTinder = {};

    fbToken(decode(email), decode(pass) )
      .then(fbData => {

        saveFb.token = fbData.token;
        saveFb.expireIn = fbData.expireIn;
        saveFb.id = fbId;

        return tinderToken(saveFb.token, saveFb.id);

      })
      .then( (tinderData) => {

        Object.assign(saveTinder, tinderData);

        return saveAccount(saveFb, saveTinder);

      })
      .then( () => {

        resolve({ 'fb': saveFb, 'tinder': saveTinder });

      }).catch( err => reject(err) );

  });

};