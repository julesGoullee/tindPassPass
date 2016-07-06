/**
 * Send one message to match
 * @param {Object} clientTinder - tinder client instance
 * @param {String} matchId - match id
 * @param {String} message - message content
 * @return {Promise} when message sent
 */
function sendMessage(clientTinder, matchId, message){

  return new Promise( (resolve, reject) => {

    clientTinder.sendMessage(matchId, message, (err, res) => {

      if(err){

        return reject(err);

      }

      resolve();

    });

  });

}

/**
 * Send all messages to match
 * @param {Object} user - user props
 * @param {String} matchId - match id
 * @param {Array} messages - list of messages to send
 * @return {Promise} when messages sent
 */
module.exports = function send(user, matchId, messages){

  return Promise.all(messages.map(message => sendMessage(user.profile.tinderClient, matchId, message) ) );

};
