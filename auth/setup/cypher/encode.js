/**
 * Encode unicode to hexadecimal
 * @param {String} str - unicode chain
 * @return {String} hexadecimal chain
 */
module.exports = function encode(str){

  return Array.from(str)
    .map( (char) => char.charCodeAt(char).toString(16) )
    .reduce( (acc, hex) => acc + ('000'+ hex).slice(-4), '');

};
