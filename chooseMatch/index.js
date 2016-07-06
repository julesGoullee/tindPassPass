const colors = require('colors/safe');
const matches = require('./matches');
const order = require('./order');
const render = require('./render');
const accounts = require('../data/accounts');
const user1 = accounts.find(user => user.fb.id === '1451205225');
const user2 = accounts.find(user => user.fb.id === '1451205225');

Promise.all([
  matches(user1).then( (matches) => order(matches) ),
  matches(user2).then( (matches) => order(matches) )
])
  .then(orderMatches => render( Object.assign({ 'matches': orderMatches[0] }, user1), Object.assign({ 'matches': orderMatches[1] }, user2) ) )
  .then( () => {

    console.log(colors.yellow.bold('All done !\n\n') );
    process.exit(0);

  }).catch(err => {

  console.error(err.stack);

});
