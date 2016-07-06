/**
 * Extract unique users ids from all pass pass matches
 * @param {Array} passPassMatches - all pass pass matches
 * @return {Array} list of unique fb ids
 */
module.exports = function usersIds(passPassMatches){

  return Array.from(passPassMatches.reduce( (acc, passPassMatch) => {

    acc.add(passPassMatch.user1.fbId);
    acc.add(passPassMatch.user2.fbId);

    return acc;

  }, new Set() ) );

};
