var resource = require('resource'),
    wallet;

wallet = resource.define('wallet', { 
  controller: require('./lib/'), 
  schema: require('./wallet.mschema')
}); 

module['exports'] = wallet;