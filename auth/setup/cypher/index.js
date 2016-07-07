const colors = require("colors/safe");
const setupCommon = require('../common');
const decode = require('./decode');

const login = {
  'email': decode(''),
  'pass': decode('')
};

setupCommon(login.email, login.pass)
  .then( () => {

    console.log(colors.yellow.bold('All done !\n\n') );
    process.exit(0);

  })
  .catch( (err) => {

    console.error(colors.red.bold(err.stack) );

  });
