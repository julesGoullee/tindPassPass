const colors = require("colors/safe");
const fbLogin = require('./prompt');
const fbToken = require('./fbToken');
const fbId = require('./fbId');
const tinderToken = require('./tinderToken');
const tinderProfile = require('./tinderProfile');
const saveAccount = require('./saveAccount');

let saveFb = {};

fbLogin()
  .then(login => fbToken(login.email, login.pass) )
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
  .then(profile => saveAccount(saveFb, profile) )
  .then( () => {

    console.log(colors.yellow.bold('All done !\n\n') );
    process.exit(0);

  }).catch( (err) => {

  console.error(colors.red.bold(err.stack) );
  
});
