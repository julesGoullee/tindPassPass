const consts = require('./consts');

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

      console.log(`
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
 */
function poolNewMatchesMessages(profile, cb){

  getNewMessages(profile).then( matchesWithMessages => {

    if(matchesWithMessages.length > 0){

      matchesWithMessages.map(matchWithMessages => cb(profile, matchWithMessages) );

    }

    setTimeout( () => poolNewMatchesMessages(profile, cb), consts.CHECK_MESSAGE_INTERVAL);

  }).catch(err => {

    console.error(`Pool update error for ${profile.fb.id}`);
    console.error(err.stack);

    setTimeout( () => poolNewMatchesMessages(profile, cb), consts.CHECK_MESSAGE_INTERVAL);

  });

}

/**
 * Pooling new messages for each profiles
 * @param {Array} profiles - list of profiles
 * @param {Function} onNewMessage - callback on new match messages
 */
module.exports = function newMessage(profiles, onNewMessage){

  profiles.forEach(profile => poolNewMatchesMessages(profile, onNewMessage) );

};
