module['exports'] = function (options, callback) {
  var wallet = require('resource').wallet;
  wallet.get(options.id, function(err, result){
    if (err || typeof result === 'undefined') {
      return callback(err, 'failure');
    }
    if (typeof result.currencies[options.currency] === 'undefined') {
      result.currencies[options.currency] = {
        "amount": 0
      };
    }
    result.currencies[options.currency].amount += options.amount;
    if (result.status === "new") {
      result.status = "active";
    }
    result.save(function(err, result){
      callback(err, result);
    });
  });
};