const colors = require("colors/safe");
const fbLogin = require('./prompt');
const fbToken = require('./fbToken');
const fbId = require('./fbId');
const tinderToken = require('./tinderToken');
const tinderProfile = require('./tinderProfile');
const saveAccount = require('./saveAccount');

let saveFbToken = null;
let saveFbId = null;

fbLogin()
  .then(login => fbToken(login.email, login.pass) )
  .then(token => {

    saveFbToken = token;
    
    return fbId(saveFbToken);

  })
  .then(id => {

    saveFbId = id;

    return tinderToken(saveFbToken, saveFbId);

  })
  .then(token => tinderProfile(token) )
  .then(profile => saveAccount(saveFbId, profile) )
  .then( () => {

    console.log(colors.yellow.bold('All done !\n\n') );
    process.exit(0);

  }).catch( (err) => {

  console.error(colors.red.bold(err.stack) );
  
});
