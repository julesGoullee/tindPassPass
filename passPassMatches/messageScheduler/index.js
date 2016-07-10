const log = require('npmlog');
const send = require('./send');

/**
 * Check if match is in user pass pass match
 * @param {Object} profile - user profile props
 * @param {String} matchId - match id
 * @return {boolean} is match pass pass or not
 */
function isMatchPassPass(profile, matchId){

  for(let i = 0; i < profile.matches.length; i++) {

    const match = profile.matches[i];

    if(match.user1.matchId === matchId || match.user2.matchId === matchId){

      return true;

    }

  }

  return false;

}

/**
 * Find one match in user matches
 * @param {Array} matches - user matches list
 * @param {String} matchId - id to search
 * @return {Object|Boolean} find match or false
 */
function findMatch(matches, matchId){

  return matches.find(match => match.user1.matchId === matchId || match.user2.matchId === matchId);

}

/**
 * Get other user in match
 * @param {Object} match - match props
 * @param {String} userId - user fb id
 * @param {String} matchId - current match from messages
 * @return {Object} other user profile
 */
function getOtherUser(match, userId, matchId){

  if(match.user1.fb.id === userId && match.user1.matchId === matchId){

    return match.user2;

  } else if(match.user2.fb.id === userId && match.user2.matchId === matchId){

    return match.user1;

  } else {

    throw Error(`User ${userId} not found in this match ${match.id}`);

  }

}

/**
 * Schedule when user receive messages
 * @param {Object} profile - user profile
 * @param {Object} matchWithMessages - match with this new message
 */
module.exports = function messageScheduler(profile, matchWithMessages){

  if(isMatchPassPass(profile, matchWithMessages.id) ){

    const match = findMatch(profile.matches, matchWithMessages.id);

    const otherUser = getOtherUser(match, profile.fb.id, matchWithMessages.id);

    send(otherUser, otherUser.matchId, matchWithMessages.messages)
      .catch(err => {

        log.error('update', err.stack);

      });

  } else {

    log.info('update', `${profile.fb.id} match new messages isn't pass pass`);

  }

};
