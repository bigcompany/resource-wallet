var tap = require("tap"), 
    request = require('request');

var wallet = require('../'),
    id = null;

tap.test('can persist wallet resource to memory', function (t) {
  // tests require a running couchdb to pass
  wallet.persist({
    "type": "memory"
  });
  t.end('wallet persisted to memory');
});

tap.test('can create wallet', function (t) {
  wallet.create({ owner: "marak" }, function(err, result){
    id = result.id;
    t.equal(err, null);
    t.end();
  });
});

tap.test('can get created wallet and add new recieving address', function (t) {

  wallet.before('generateAddress', function (data, next){
    data.publicKey = "a-b-c-d-e-f-g-h-j-k";
    next(null, data);
  });

  wallet.generateAddress({ id: id, owner: "marak", type: "PPC" }, function (err, result) {
    t.equal(err, null);
    t.type(result, "object");
    t.end();
  });

});

tap.test('can verify recieving address', function (t) {
  wallet.get(id, function (err, result){
    t.equal(err, null);
    t.equal(result.receivingAddresses['PPC'], "a-b-c-d-e-f-g-h-j-k");
    t.end();
  })
});

tap.test('attempt to regenerate public address', function (t) {
  wallet.generateAddress({ id: id, owner: "marak", type: "PPC" }, function (err, result) {
    t.equal(err, null);
    t.equal(result, 'failure');
    t.end();
  });
});

tap.test('add another recieving address for new type', function (t) {
  wallet.generateAddress({ id: id, owner: "marak", type: "BTC" }, function (err, result) {
    t.equal(err, null);
    t.type(result, 'object');
    t.end();
  });
});

tap.test('attempt to regenerate public address', function (t) {
  wallet.generateAddress({ id: id, owner: "marak", type: "BTC" }, function (err, result) {
    t.equal(err, null);
    t.equal(result, 'failure');
    t.end();
  });
});