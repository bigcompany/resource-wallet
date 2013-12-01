module['exports'] = function (options, callback) {
  var wallet = require('resource').wallet;
  console.log('getting', options.id)
  wallet.get(options.id, function (err, result){
    if (err) {
      return callback(err);
    }
    console.log('err',err,  result);
    if (typeof result === 'undefined') {
      return callback(null, 'failure');
    }

    // do not allow regeneration of keys
    if (typeof result.receivingAddresses[options.type] !== 'undefined') {
      return callback(null, 'failure');
    }
    result.receivingAddresses[options.type] = options.publicKey;
    result.save(function(err){
      callback(err, result);
    })
  });
};