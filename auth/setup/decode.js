/**
 * Decode hexadecimal to unicode
 * @param {String} str - hex chain
 * @return {String} unicode chain
 */
module.exports = function hexDecode(str){

  return Array.from(str.match(/.{1,4}/g) || [])
    .map( (hex) => String.fromCharCode(parseInt(hex, 16)) )
    .reduce( (acc, unicode) => acc + unicode, '');

};
