module['exports'] = function (options, callback) {
  var wallet = require('resource').wallet;
  wallet.get(options.id, function(err, result){
    if (err) {
      return callback(err, 'failure');
    }
    if(typeof result.currencies[options.currency] === 'undefined') {
      return callback(err, 'failure');
    }
    if(result.currencies[options.currency].amount < options.amount) {
      return callback(new Error('Insufficient funds'), 'insufficient funds');
    }
    result.currencies[options.currency].amount = result.currencies[options.currency].amount - options.amount;
    result.save(function(err){
      callback(err, { 'amount': options.amount, 'currency': options.currency, 'owner': result.owner, id: result.id });
    });
  });
};