/**
 * Order by date
 * @param {Object} match1 - first match
 * @param {Object} match2 - scd match
 * @return {number} sort result
 */
function orderByCreatedDate(match1, match2){

  return match2.lastActivityDate - match1.lastActivityDate;

}

/**
 * Check if user sent message
 * @param {Object} match - current match
 * @return {Boolean} send or not
 */
function userSentMessage(match){

  return match.userSentMessage;

}

/**
 * Check if discussion is started
 * @param {Object} match - current match
 * @return {Boolean} started or not
 */
function isDiscussionStarted(match){

  return match.alreadyChat;

}

/**
 * Order match by multiple criteria
 * @param {Array} matches - list of match
 * @return {Object} order matches
 */
module.exports = function order(matches){

  const cleanMatches = matches.filter(match => !isDiscussionStarted(match) ).sort(orderByCreatedDate);
  const onlyOtherSentMessageMatches = matches.filter(match => isDiscussionStarted(match) )
    .filter(match => !userSentMessage(match) ).sort(orderByCreatedDate);

  const discussionMatches = matches.filter(isDiscussionStarted)
    .filter(userSentMessage).sort(orderByCreatedDate);

  return {
    'clean': cleanMatches,
    'onlyOtherSentMessage': onlyOtherSentMessageMatches,
    'discussion': discussionMatches
  };

};
