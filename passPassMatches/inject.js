/**
 * Inject profile into match
 * @param {Object} passPassMatches - match props
 * @param {Array} profiles - list of unique profiles
 */
function injectProfilesIntoPassPassMatches(passPassMatches, profiles){

  passPassMatches.forEach( passPassMatch => {

    passPassMatch.user1.profile = profiles.find( (account) => account.fb.id === passPassMatch.user1.fbId);

    passPassMatch.user2.profile = profiles.find( (account) => account.fb.id === passPassMatch.user2.fbId);

  });

}

/**
 * Check if fbId is a user into match
 * @param {Object} match - match props
 * @param {String} fbId - user fbId
 * @return {boolean} is in match or not
 */
function isInMatch(match, fbId){

  return match.user1.fbId === fbId || match.user2.fbId === fbId;

}

/**
 * Inject matches into profiles
 * @param {Object} passPassMatches - match props
 * @param {Array} profiles - list of unique profiles
 */
function injectMatchesIntoProfiles(passPassMatches, profiles){

  profiles.forEach( (profile) => {

    profile.matches = passPassMatches.filter( (passPassMatch) => isInMatch(passPassMatch, profile.fbId) );

  });

}

/**
 * Double references profile into pass pass matches and reciprocal
 * @param {Object} passPassMatches - match props
 * @param {Array} profiles - list of unique profiles
 */
module.exports = function inject(passPassMatches, profiles){

  injectProfilesIntoPassPassMatches(passPassMatches, profiles);
  injectMatchesIntoProfiles(passPassMatches, profiles);

};
