const Browser = require('zombie');
const colors = require('colors/safe');
const consts = require('./const');

/**
 * Get fb access token for tinder app
 * @param {String} email - fb user email
 * @param {String} password - fb user pass
 * @return {Promise} resolve with access token
 */
module.exports = function fbToken(email, password){

  return new Promise( (resolve, reject) => {

    console.log(colors.blue.bold('Facebook authentication...... \n\n') );

    const browser = new Browser({
      'waitDuration': '20s'
    });

    const timeoutRedirection = 20000;
    let timerRedirect = null;

    browser.on('loaded', () => {

      const t = browser.url.match(/#access_token=(.+)&/);

      if(t && t[1]){

        if(timerRedirect){

          clearTimeout(timerRedirect);

        }

        console.log(colors.blue.bold('Facebook access token success ! \n\n') );

        const token = t[1];
        resolve(token);

      }

    });

    browser.visit(consts.FB.AUTHENTICATION_TOKEN_URL)
      .then( () => browser.fill('#email', email).fill('#pass', password) )
      .then( () => browser.pressButton('#loginbutton') )
      .then( () => {

        timerRedirect = setTimeout( () => {

          reject( Error('Login incorrect or cannot load accessToken in redirection phase') );

        }, timeoutRedirection);

      })
      .catch(err => reject(err) );

  });

};
