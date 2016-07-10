/**
 * Check if all matches are uniques
 * @param {Array} passPassMatches - list of matches
 * @return {Promise} resolve if uniques
 */
module.exports = function allMatchesAreUniques(passPassMatches){

  return new Promise( (resolve, reject) => {

    const nbUnique = Array.from(passPassMatches.reduce( (acc, passPassMatch) => {

      acc.add(passPassMatch.user1.matchId);
      acc.add(passPassMatch.user2.matchId);

      return acc;

    }, new Set() ) ).length;

    if(nbUnique === passPassMatches.length * 2){

      resolve(Object.assign([], passPassMatches) );

    } else{

      reject( Error('Matches doubloons in pass pass matches file') );

    }

  });

};
