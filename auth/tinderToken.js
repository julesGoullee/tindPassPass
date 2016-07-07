const colors = require('colors/safe');
const tinder = require('tinder');
const client = new tinder.TinderClient();

/**
 * Get tinder token
 * @param {String} fbToken - fb token
 * @param {String} fbId - fb id
 */
module.exports = function tinderToken(fbToken, fbId){

  return new Promise( (resolve, reject) => {

    console.log(colors.red.bold('Tinder authentication...... \n\n') );

    client.authorize(fbToken, fbId, () => {

      if(client.isAuthorized() ){

        console.log(colors.red.bold('Tinder token success ! \n\n') );

        resolve(client.getAuthToken() );

      } else{

        reject( Error('Tinder auth error') );

      }

    });

  });

};
