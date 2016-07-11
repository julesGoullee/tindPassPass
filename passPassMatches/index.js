require('../config/log');
const log = require('npmlog');
const colors = require('colors/safe');
const path = require('path');
const consts = require('../config/consts');
const passPassMatchesFile = require(path.resolve(path.join(consts.DATA_PATH, '/passPassMatches') ) );
const allMatchesAreUniques = require('./allMatchesAreUniques');
const uniqueProfiles = require('./uniqueProfiles');
const inject = require('./inject');
const newMessage = require('./newMessage');
const messageScheduler = require('./messageScheduler');

allMatchesAreUniques(passPassMatchesFile).then( (passPassMatches) => {

  const profiles = uniqueProfiles(passPassMatches);
  inject(passPassMatches, profiles);
  log.info('step', colors.yellow.bold(`read from file ${passPassMatches.length} pass pass matches.......`) );

  newMessage(profiles, messageScheduler, passPassMatches);

}).catch(err => log.error('allMatchesAreUniques', colors.red.bold(err.stack) ) );
