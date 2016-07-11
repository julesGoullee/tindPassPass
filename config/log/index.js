const log = require('npmlog');
log.level = 'silly';
log.on('log', (mess) => {

  mess.prefix = `[${new Date().toUTCString()}][${mess.prefix}]`;

  return mess;

});
