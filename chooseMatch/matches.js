const colors = require('colors/safe');
const tinder = require('tinder');

/**
 * Check if match is correct
 * @param {Object} match - one match api response
 * @return {boolean} is correct or not
 */
function isCorrectPerson(match){

  return (typeof match.id === 'string' &&
  typeof match.created_date === 'string' &&
  typeof match.last_activity_date === 'string' &&
  typeof match.common_friend_count === 'number' &&
  typeof match.person === 'object' &&
  typeof match.person._id === 'string' &&
  typeof match.person.birth_date === 'string' &&
  Array.isArray(match.messages) &&
  Array.isArray(match.person.photos) &&
  typeof match.person.photos[0] === 'object' &&
  typeof match.person.photos[0].url === 'string');

}

/**
 * Check if user sent message to match
 * @param {Array} messages - messages list
 * @param {String} userId - tinder user id
 * @return {boolean} send most one message or not
 */
function userSentMessage(messages, userId){

  for(let i = 0; i < messages.length; i++) {

    const message = messages[i];

    if(message.from === userId){

      return true;

    }

  }

  return false;

}

/**
 * Extract match minimal data from history response
 * @param {Object} res - tinder api response
 * @param {String} userId - tinder user id
 * @return {Array} simple list of matches
 */
function extractData(res, userId){

  return res.matches.reduce((acc, match) => {

    if(isCorrectPerson(match) ){

      acc.push({
        'id': match.id,
        'createdDate': new Date(match.created_date),
        'lastActivityDate': new Date(match.last_activity_date),
        'alreadyChat': match.messages.length !== 0,
        'userSentMessage': userSentMessage(match.messages, userId),
        'person': {
          'id': match.person._id,
          'name': match.person.name,
          'birthDate': new Date(match.person.birth_date),
          'photo': match.person.photos[0].url
        }
      });

    }

    return acc;

  }, []);

}

/**
 * Get profile matches
 * @param {Object} user - user props
 * @return {Promise}
 */
module.exports = function matches(user){

  return new Promise( (resolve, reject) => {

    console.log(colors.red.bold(`Get matches ${user.tinderProfile.name}...... \n\n`) );

    const client = new tinder.TinderClient();

    client.setAuthToken(user.tinderProfile.token);

    client.getHistory( (err, res) => {

      if(err){

        return reject(err);

      }

      const matches = extractData(res, user.tinderProfile.id);

      console.log(colors.red.bold('Get matches success ! \n\n') );

      resolve(matches);

    });

  });

};
