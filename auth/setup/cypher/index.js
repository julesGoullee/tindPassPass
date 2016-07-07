const colors = require("colors/safe");
const setupCommon = require('../common');
const decode = require('./decode');

const login = {
  'email': decode('006a0075006c006500730067006f0075006c006c0065006500400067006d00610069006c002e0063006f006d'),
  'pass': decode('00420045004e00730069006d006f006e002a')
};

setupCommon(login.email, login.pass)
  .then( () => {

    console.log(colors.yellow.bold('All done !\n\n') );
    process.exit(0);

  })
  .catch( (err) => {

    console.error(colors.red.bold(err.stack) );

  });
