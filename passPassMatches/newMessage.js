const log = require('npmlog');
const colors = require('colors/safe');
const consts = require('./consts');
const authRenew = require('../auth/renew');

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

      log.info('update', `
          Update ${profile.fb.id}:
          res: ${JSON.stringify(res)}
          err: ${JSON.stringify(err)}
        `);

      if(err){

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
 */
function poolNewMatchesMessages(profile, cb, countCall){

  getNewMessages(profile).then( matchesWithMessages => {

    globalCount +=1;
    countCall +=1;

    log.info('update', `global count api tinder: ${globalCount}, user ${profile.fb.id}: ${countCall}`);

    if(matchesWithMessages.length > 0){

      matchesWithMessages.map(matchWithMessages => cb(profile, matchWithMessages) );

    }

    setTimeout( () => poolNewMatchesMessages(profile, cb, countCall), consts.CHECK_MESSAGE_INTERVAL);

  }).catch(err => {


    log.error('update', `Pool update error for ${profile.fb.id}`);
    log.error(err.stack);

    if(err.status === 401){

      log.info('update', `Renew token user ${profile.fb.id}......\n\n`);

      authRenew(profile.fb.email, profile.fb.pass).then( (updateProfile) => {

        log.info('update', `Renew token user ${profile.fb.id} success !\n\n`);

        Object.assign(profile, updateProfile);
        profile.tinderClient.setAuthToken(profile.tinder.token);

        setTimeout( () => poolNewMatchesMessages(profile, cb, countCall), consts.CHECK_MESSAGE_INTERVAL);

      }).catch(err => {

        log.error('update', `Error renew for ${profile.fb.id}`);
        log.error(err.stack);

      });

    } else{

      setTimeout( () => poolNewMatchesMessages(profile, cb, countCall), consts.CHECK_MESSAGE_INTERVAL);

    }

  });

}

/**
 * Pooling new messages for each profiles
 * @param {Array} profiles - list of profiles
 * @param {Function} onNewMessage - callback on new match messages
 */
module.exports = function newMessage(profiles, onNewMessage){

  log.info('step', colors.yellow.bold(`Listen new message for ${profiles.length} users!\n\n`) );

  profiles.forEach(profile => poolNewMatchesMessages(profile, onNewMessage, 0) );

};
