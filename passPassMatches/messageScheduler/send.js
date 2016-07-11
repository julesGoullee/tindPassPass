const log = require('npmlog');

/**
 * Send one message to match
 * @param {Object} clientTinder - tinder client instance
 * @param {String} matchId - match id
 * @param {String} message - message content
 * @return {Promise} when message sent
 */
function sendMessage(clientTinder, matchId, message){

  return new Promise( (resolve, reject) => {

    log.info('send', `tinder user ${clientTinder.userId} send mess to match ${matchId}......`);

    clientTinder.sendMessage(matchId, message, (err, res) => {

      if(err){

        log.error('send', `tinder user ${clientTinder.userId} didn't sent to match ${matchId}`);

        return reject(err);

      }

      log.info('send', `tinder user ${clientTinder.userId} sent success to ${matchId}`);

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
