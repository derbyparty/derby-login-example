var derby = require('derby');

var app = module.exports = derby.createApp('login', __filename);

if (!derby.util.isProduction) global.app = app;

app.use(require('d-bootstrap'));
app.use(require('derby-login/components/notAuth'));
app.serverUse(module, 'derby-stylus');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.get('/confirmregistration', function(page, model){
  page.render('confirmregistration');
});

app.get('/recoverpassword', function(page, model, params){
  var secret = params.query.secret;
  model.set('_page.secret', secret);
  page.render('recoverpassword');
});

app.get('/login', function(page, model){
  page.render('login');
});

app.proto.passwordChanged = function(data) {
  app.model.set('_page.passwordChanged', true);
}

app.proto.recoveryEmailSent = function(data) {
  alert('Recovery email is sent to ' + data.email);
}
