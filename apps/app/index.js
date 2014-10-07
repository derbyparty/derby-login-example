var derby = require('derby');

var app = module.exports = derby.createApp('app', __filename);

if (!derby.util.isProduction) global.app = app;

app.use(require('d-bootstrap'));
app.use(require('derby-login/components/auth'));
app.serverUse(module, 'derby-stylus');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.get('*', function(page, model, params, next) {
  if (model.get('_session.loggedIn')) {
    var userId = model.get('_session.userId');
    var $user = model.at('users.' + userId);
    model.subscribe($user, function() {
      model.ref('_session.user', $user);
      next();
    });
  } else {
    next();
  }
});

app.get('/', function(page, model){
  page.render('home');
});

app.get('/emailchangeconfirmed', function(page, model){
  page.render('emailchangeconfirmed');
});

app.get('/registrationconfirmed', function(page, model){
  page.render('registrationconfirmed');
});

app.proto.emailChanged = function(data) {
  alert('Confirmation email is sent to ' + data.email);
}

app.proto.passwordChanged = function(data) {
  alert('Password is changed');
}
