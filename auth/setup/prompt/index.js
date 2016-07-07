const colors = require("colors/safe");
const setupCommon = require('../common');
const input = require('./input');

input()
  .then( (login) => setupCommon(login.email, login.pass) )
  .then( () => {

    console.log(colors.yellow.bold('All done !\n\n') );
    process.exit(0);

  })
  .catch( (err) => {

    console.error(colors.red.bold(err.stack) );

  });
