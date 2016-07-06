const colors = require('colors/safe');
const r = require('request');
const consts = require('./const');

/**
 * Check if req fb graph api is error
 * @param {Object} body - graph api response
 * @return {Boolean} is error or not
 */
function fbApiError(body){

  return (
    typeof body === 'object' &&
    typeof body.error === 'object' &&
    typeof body.error.message === 'string'
  );

}

/**
 * Call facebook graph api /me to get user id
 * @param {String} token - fb access token
 * @return {Promise} resolve with fb id
 */
module.exports = function fbId(token){

  return new Promise( (resolve, reject) => {

    console.log(colors.blue.bold('Get facebook graph api...... \n\n') );

    r({
      'method': 'GET',
      'url': `${consts.FB.GRAPH_API_URL}${token}`,
      'json': true
    }, (err, res, body) => {

      if(err){

        return reject(err);

      } else if(fbApiError(body) ){

        return reject( Error(body.error.message) );

      }

      console.log(colors.blue.bold('Facebook id success ! \n\n') );

      resolve(body.id);

    });

  });

};
