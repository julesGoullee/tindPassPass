require('../../../config/log');
const log = require('npmlog');
const colors = require('colors/safe');
const setupCommon = require('../common');
const input = require('./input');

input()
  .then( (login) => setupCommon(login.email, login.pass) )
  .then( () => {

    log.info('step', colors.yellow.bold('All done') );
    process.exit(0);

  })
  .catch( (err) => log.error(colors.red.bold(err.stack) ) );
