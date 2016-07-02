const colors = require('colors/safe');
const tinder = require('tinder');

/**
 * Get tinder profile
 * @param {String} tinderToken - auth tinder token
 * @return {Promise} resolve with profile
 */
module.exports = function tinderProfile(tinderToken){

  return new Promise( (resolve, reject) => {

    console.log(colors.red.bold('Get tinder profile...... \n\n') );

    const client = new tinder.TinderClient();

    client.setAuthToken(tinderToken);

    client.getAccount( (err, res) => {

      if(err){

        return reject(err);

      }

      const profile = {
        'id': res.user._id,
        'name': res.user.full_name,
        'token': res.user.api_token,
        'photo': res.user.photos[0].url
      };

      console.log(colors.red.bold('Tinder profile success ! \n\n') );

      resolve(profile);

    });

  });

};
