const log = require('npmlog');
const colors = require('colors/safe');
const prompt = require('prompt');
const encode = require('../encode');

/**
 * Show prompt to get user fb login
 * @return {Promise} when you enter login
 */
module.exports = function input(){

  return new Promise( (resolve, reject) => {

    log.info('step', colors.blue.bold('Please enter facebook login: \n\n') );

    prompt.delimiter = colors.blue.bold('> ');
    prompt.message = colors.blue.bold('Login');

    prompt.start();

    prompt.get([{
      'name': 'email',
      'required': true,
      'description': colors.yellow('Email')
    }, {
      'name': 'password',
      'required': true,
      'description': colors.cyan('Password'),
      'hidden': true,
      'replace': '*'
    }], (err, result) => {

      if(err){

        return reject(err);

      }

      prompt.stop();

      resolve({
        'email': encode(result.email),
        'pass': encode(result.password)
      });

    });

  });

};
