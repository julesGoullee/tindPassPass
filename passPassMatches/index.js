require('../config/log');
const log = require('npmlog');
const colors = require('colors/safe');
const path = require('path');
const consts = require('../config/consts');
const passPassMatchesFile = require(path.resolve( path.join(consts.DATA_PATH, '/passPassMatches') ));

const passPassMatches = Object.assign([], passPassMatchesFile);
log.info('step', colors.yellow.bold(`Read from file ${passPassMatches.length} pass pass matches.......\n\n`) );

const uniqueProfiles = require('./uniqueProfiles');
const inject = require('./inject');
const newMessage = require('./newMessage');
const messageScheduler = require('./messageScheduler');

const profiles = uniqueProfiles(passPassMatches);
inject(passPassMatches, profiles);
newMessage(profiles, messageScheduler);
