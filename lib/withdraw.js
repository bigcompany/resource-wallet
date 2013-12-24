var bignum = require('bignumber.js');

module['exports'] = function (options, callback) {
  var wallet = require('resource').wallet;
  wallet.get(options.id, function(err, result){
    if (err) {
      return callback(err, 'failure');
    }
    if(typeof result.currencies[options.currency] === 'undefined') {
      return callback(err, 'failure');
    }

    // Checks for loss of precision
    if (typeof options.amount === 'number' && String(options.amount).length > 15) {
      console.log('warning', 'Possible precision loss on transaction amount:', options.amount);
    }
    options.amount = bignum(options.amount);

    if(bignum(result.currencies[options.currency].amount).lt(options.amount)) {
      return callback(new Error('Insufficient funds'), 'insufficient funds');
    }
    result.currencies[options.currency].amount = bignum(result.currencies[options.currency].amount)
                                                  .minus(options.amount)
                                                  .toFixed();
    result.save(function(err){
      callback(err, { 'amount': options.amount.toFixed(), 'currency': options.currency, 'owner': result.owner, id: result.id });
    });
  });
};