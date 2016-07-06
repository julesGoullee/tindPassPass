const path = require('path');
const pathFile = './data/passPassMatches';
const passPassMatchesFile = require(path.resolve(pathFile) );

const passPassMatches = Object.assign([], passPassMatchesFile);
const uniqueProfiles = require('./uniqueProfiles');
const inject = require('./inject');
const newMessage = require('./newMessage');
const messageScheduler = require('./messageScheduler');

const profiles = uniqueProfiles(passPassMatches);
inject(passPassMatches, profiles);
newMessage(profiles, messageScheduler);
