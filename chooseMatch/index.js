require('../config/log');
const log = require('npmlog');
const colors = require('colors/safe');
const path = require('path');

const matches = require('./matches');
const order = require('./order');
const render = require('./render');
const consts = require('../config/consts');
const accounts = require(path.resolve( path.join(consts.DATA_PATH, '/accounts') ));
const user1 = accounts.find(user => user.fb.id === '10203307599348697');
const user2 = accounts.find(user => user.fb.id === '1451205225');

Promise.all([
  matches(user1).then( (matches) => order(matches) ),
  matches(user2).then( (matches) => order(matches) )
])
  .then(orderMatches => render( Object.assign({ 'matches': orderMatches[0] }, user1), Object.assign({ 'matches': orderMatches[1] }, user2) ) )
  .then( () => {

    log.info('step', colors.yellow.bold('all done !') );
    process.exit(0);

  }).catch(err => log.error('fatal', err.stack) );
