module['exports'] = function (options, callback) {
  var wallet = require('resource').wallet;
  wallet.get(options.id, function(err, result){
    if (err) {
      return callback(err, 'failure');
    }
    if(typeof result.currencies[options.type] === 'undefined') {
      return callback(err, 'failure');
    }
    if(result.currencies[options.type] < options.amount) {
      return callback(err, 'insufficient funds');
    }
    result.currencies[options.type].amount = result.currencies[options.type].amount - options.amount;
    result.save(function(err){
      callback(err, { 'amount': options.amount, 'type': options.type, 'owner': result.owner, id: result.id });
    });
  });
};