require('../../../config/log');
const log = require('npmlog');
const colors = require("colors/safe");
const setupCommon = require('../common');

const login = {
  'email': '',
  'pass': ''
};

setupCommon(login.email, login.pass)
  .then( () => {

    log.info('step', colors.yellow.bold('All done !\n\n') );
    process.exit(0);

  })
  .catch(err => log.error('step', colors.red.bold(err.stack) ) );
