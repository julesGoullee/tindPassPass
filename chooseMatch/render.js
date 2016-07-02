const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const templateSrc = fs.readFileSync('./template.html').toString();
const template = handlebars.compile(templateSrc);
const currentYear = (new Date() ).getFullYear();

handlebars.registerHelper('age', function(options){

  return currentYear - (new Date(options.fn(this)) ).getFullYear() ;

});

handlebars.registerHelper('date', function(options){

  return (new Date(options.fn(this)) ).toDateString() ;

});

/**
 * Get path for unique file timestamped
 * @param {Object} userFirst - first user props
 * @param {Object} userScd - first user props
 * @return {string} filename
 */
function getFileName(userFirst, userScd){

  const now = new Date(Date.now() );

  const day = (`0${now.getDate()}`).slice(-2);
  const month = (`0${now.getMonth() + 1}`).slice(-2);
  const year = now.getFullYear();
  const hour = (`0${now.getHours()}`).slice(-2);
  const min =  (`0${now.getMinutes()}`).slice(-2);
  const sec = (`0${now.getSeconds()}`).slice(-2);

  return `${day}-${month}-${year}--${hour}-${min}-${sec}__${userFirst.fbId}-${userScd.fbId}`;

}


/**
 * Render html page from template with user data
 * @param {Object} user1 - first user with matches data
 * @param {Object} user2 - second user with matches data
 * @return {Promise} when file write
 */
module.exports = function render(user1, user2){

  return new Promise( (resolve, reject) => {

    const html = template({ user1, user2 });

    fs.writeFile(path.resolve('../data/chooseMatch/', `${getFileName(user1, user2)}.html`), html, err => {

      if(err){

        return reject(err);

      }

      resolve();

    });

  });

};
