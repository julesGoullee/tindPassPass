const log = require('npmlog');
const colors = require('colors/safe');
const consts = require('./consts');
const authRenew = require('../auth/renew');
const saveMatches = require('./saveMatches');

let globalCount = 0;

/**
 * Extract message from api update res, group by match
 * @param {Object} res - api update res
 * @param {String} tinderId - tinder user id
 * @return {Array} list of messages group by match
 */
function extractNewMessages(res, tinderId){

  return res.matches.reduce( (acc, match) => {

    const messagesToUser = match.messages.reduce( (acc, message) => {

      if(message.to === tinderId){

        acc.push(message.message);

      }

      return acc;

    }, []);

    if(messagesToUser.length > 0){

      acc.push({
        'id': match._id,
        'messages': messagesToUser
      })
    }


    return acc;

  }, []);

}

/**
 * Check in api response if empty
 * @param {Object} res - tinder api response
 * @return {Boolean} empty or not
 */
function isEmpty(res){

  return (
    typeof res === 'object' &&
    Array.isArray(res.matches) &&
    res.matches.length === 0
  );

}

/**
 * Call tinder api to get update user accouts
 * @param {Object} profile - user props
 * @return {Promise} when req ended
 */
function getNewMessages(profile){

  return new Promise( (resolve, reject) => {

    profile.tinderClient.getUpdates( (err, res) => {

      log.info('update', `update ${profile.fb.id}: res: ${JSON.stringify(res)}`);

      if(err){

        log.error('update', `update ${profile.fb.id}: err: ${JSON.stringify(err)}`);

        reject(err);

      } else if(!isEmpty(res) ){

        resolve(extractNewMessages(res, profile.tinder.id) );

      } else{

        resolve([]);

      }

    });

  });

}

/**
 * Recursive function for pooling new message for user
 * @param {Object} profile - user props
 * @param {Function} cb - call each new match messages
 * @param {Number} countCall - count user call api
 * @param {Array} passPassMatches - list of matches
 */
function poolNewMatchesMessages(profile, cb, countCall, passPassMatches){

  getNewMessages(profile).then( matchesWithMessages => {

    globalCount +=1;
    countCall +=1;

    log.info('update', `global count api tinder: ${globalCount}, user ${profile.fb.id}: ${countCall}`);

    if(matchesWithMessages.length > 0){

      Promise.all(matchesWithMessages.map(matchWithMessages => cb(profile, matchWithMessages) ) )
        .then( () => {

          profile.lastSync = Date.now();
          return saveMatches(passPassMatches).catch(err => {

            log.error('update', `user: ${profile.fb.id}`);
            log.error('update', err.stack);

          });

        }).catch(err => {

        log.error('update', `user: ${profile.fb.id}`);
        log.error('update', err.stack);

      });

    }

    profile.lastSync = Date.now();
    saveMatches(passPassMatches).catch(err => {

      log.error('update', `user: ${profile.fb.id}`);
      log.error(err.stack);

    });

    setTimeout( () => poolNewMatchesMessages(profile, cb, countCall, passPassMatches), consts.CHECK_MESSAGE_INTERVAL);

  }).catch(err => {


    log.error('update', `pool update error for ${profile.fb.id}`);

    if(err.status === 401){

      log.info('update', `renew token user ${profile.fb.id}......`);

      authRenew(profile.fb.email, profile.fb.pass, profile.fb.id).then( (updateProfile) => {

        log.info('update', `renew token user ${profile.fb.id} success!`);

        Object.assign(profile.fb, updateProfile.fb);
        Object.assign(profile.tinder, updateProfile.tinder);
        profile.tinderClient.setAuthToken(profile.tinder.token);

        setTimeout( () => poolNewMatchesMessages(profile, cb, countCall, passPassMatches), consts.CHECK_MESSAGE_INTERVAL);

      }).catch(err => {

        log.error('update', `user: ${profile.fb.id}`);
        log.error('update', err.stack);

      });

    } else{

      log.error(err.stack);
      setTimeout( () => poolNewMatchesMessages(profile, cb, countCall, passPassMatches), consts.CHECK_MESSAGE_INTERVAL);

    }

  });

}

/**
 * Pooling new messages for each profiles
 * @param {Array} profiles - list of profiles
 * @param {Function} onNewMessage - callback on new match messages
 * @param {Array} passPassMatches - list of matches
 */
module.exports = function newMessage(profiles, onNewMessage, passPassMatches){

  log.info('step', colors.yellow.bold(`listen new message for ${profiles.length} users!`) );

  profiles.forEach(profile => poolNewMatchesMessages(profile, onNewMessage, 0, passPassMatches) );

};
