var liveDbMongo = require('livedb-mongo');
var coffeeify = require('coffeeify');

module.exports = store;

function store(derby, publicDir) {

  derby.use(require('racer-bundle'));

  var opts = {db: liveDbMongo(process.env.MONGO_URL + '?auto_reconnect', {safe: true})};

  var store = derby.createStore(opts);

  store.on('bundle', function(browserify) {

    browserify.transform({global: true}, coffeeify);

    var pack = browserify.pack;
    browserify.pack = function(opts) {
      var detectTransform = opts.globalTransform.shift();
      opts.globalTransform.push(detectTransform);
      return pack.apply(this, arguments);
    };
  });

  return store;
}