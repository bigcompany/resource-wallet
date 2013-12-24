var bignum = require('bignumber.js');

module['exports'] = function (options, callback) {
  var wallet = require('resource').wallet;
  wallet.get(options.id, function(err, result){
    if (err || typeof result === 'undefined') {
      return callback(err, 'failure');
    }
    if (typeof result.currencies[options.currency] === 'undefined') {
      result.currencies[options.currency] = {
        'amount': '0'
      };
    }

    // Checks for loss of precision
    if (typeof options.amount === 'number' && String(options.amount).length > 15) {
      console.log('warning', 'Possible precision loss on transaction amount:', options.amount);
    }
    var currencyAmount = result.currencies[options.currency].amount;
    if (typeof currencyAmount === 'number' && String(currencyAmount).length > 15) {
      console.log('warning', 'Possible precision loss on balance amount:', currencyAmount);
    }
    var amount = bignum(options.amount)
                  .plus(result.currencies[options.currency].amount);
    result.currencies[options.currency].amount = amount.toFixed();

    if (result.status === "new") {
      result.status = "active";
    }
    result.save(function(err, result){
      callback(err, result);
    });
  });
};