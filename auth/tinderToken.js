const log = require('npmlog');
const colors = require('colors/safe');
const tinder = require('tinder');

/**
 * Get tinder token
 * @param {String} fbToken - fb token
 * @param {String} fbId - fb id
 * @return {Promise} resolve with tinder data
 */
module.exports = function tinderToken(fbToken, fbId){

  return new Promise( (resolve, reject) => {

    const client = new tinder.TinderClient();

    log.info('step', colors.red.bold('Tinder authentication...... \n\n') );

    client.authorize(fbToken, fbId, () => {

      if(client.isAuthorized() ){

        log.info('level', colors.red.bold('Tinder token success ! \n\n') );

        resolve({
          'token': client.getAuthToken(),
          'lastActivity': client.lastActivity.getTime()
        });

      } else{

        reject( Error('Tinder auth error') );

      }

    });

  });

};
