var resource = require('resource'),
    wallet;

wallet = resource.define('wallet', { 
  controller: require('./lib/'), 
  schema: require('mschema-wallet')
}); 

module['exports'] = wallet;