var tap = require("tap"), 
    request = require('request');

var wallet = require('../')
    id = null;

tap.test('can persist wallet resource to memory', function (t) {
  wallet.persist({
    "type": "memory"
  });
  t.end('wallet persisted to couchdb');
});

tap.test('can create wallet', function (t) {
  wallet.create({ owner: "marak" }, function(err, result){
    t.equal(err, null);
    id = result.id;
    t.end();
  })
});

tap.test('can get created wallet', function (t) {
  wallet.get(id, function (err, result){
    t.equal(err, null);
    t.equal(result.owner, 'marak');
    t.end();
  })
});

tap.test('can make deposit into fresh wallet', function (t) {
  wallet.deposit({ id: id, currency: "BTC" , "amount": 1 }, function (err, result){
    t.equal(err, null);
    t.equal(result.currencies.BTC.amount, 1);
    t.end();
  })
});

tap.test('get same wallet, verify deposit', function (t) {
  wallet.get({ id: id }, function (err, result){
    t.equal(err, null);
    t.equal(result.owner, 'marak');
    t.type(result.currencies, Object);
    t.equal(result.currencies.BTC.amount, 1);
    t.end();
  })
});

tap.test('can make additional deposit into wallet', function (t) {
  wallet.deposit({ id: id, currency: "BTC" , "amount": 30 }, function (err, result){
    t.equal(err, null);
    t.equal(result.currencies.BTC.amount, 31);
    t.end();
  })
});

tap.test('get same wallet, verify second deposit', function (t) {
  wallet.get({ id: id }, function (err, result) {
    console.log(err, result)
    t.equal(err, null);
    t.equal(result.owner, 'marak');
    t.type(result.currencies, Object);
    t.equal(result.currencies.BTC.amount, 31);
    t.end();
  })
});

tap.test('can make deposit of another type of currency', function (t) {
  wallet.deposit({ id: id, currency: "PPC" , "amount": 1 }, function (err, result){
    t.equal(err, null);
    t.equal(result.currencies.BTC.amount, 31);
    t.end();
  })
});

tap.test('get same wallet, verify deposit', function (t) {
  wallet.get({ id: id }, function (err, result){
    t.equal(err, null);
    t.equal(result.owner, 'marak');
    t.type(result.currencies, Object);
    t.equal(result.currencies.BTC.amount, 31);
    t.equal(result.currencies.PPC.amount, 1);
    t.end();
  })
});

tap.test('can make withdrawl from first currency', function (t) {
  wallet.withdraw({ id: id, currency: "BTC" , "amount": 7 }, function (err, result){
    t.equal(err, null);
    t.equal(result.amount, 7);
    t.end();
  })
});

tap.test('verify withdrawl', function (t) {
  wallet.get({ id: id }, function (err, result){
    t.equal(err, null);
    t.equal(result.owner, 'marak');
    t.type(result.currencies, Object);
    t.equal(result.currencies.BTC.amount, 24);
    t.end();
  })
});

tap.test('can make deposit with fixed point decimal', function (t) {
  wallet.deposit({ id: id, currency: "BTC" , "amount": 0.0000001 }, function (err, result){
    t.equal(err, null);
    t.equal(result.currencies.BTC.amount, 24.0000001);
    t.end();
  })
});

tap.test('get same wallet, verify deposit', function (t) {
  wallet.get({ id: id }, function (err, result){
    t.equal(err, null);
    t.equal(result.owner, 'marak');
    t.type(result.currencies, Object);
    t.equal(result.currencies.BTC.amount, 24.0000001);
    t.equal(result.currencies.PPC.amount, 1);
    t.end();
  })
});

tap.test('can make withdrawl with fixed point decimal', function (t) {
  wallet.withdraw({ id: id, currency: "BTC" , "amount": 0.0000001 }, function (err, result){
    t.equal(err, null);
    console.log(err, result)
    t.equal(result.amount, 0.0000001);
    t.end();
  })
});

tap.test('verify withdrawl', function (t) {
  wallet.get({ id: id }, function (err, result){
    t.equal(err, null);
    t.equal(result.owner, 'marak');
    t.type(result.currencies, Object);
    t.equal(result.currencies.BTC.amount, 24);
    t.end();
  })
});



