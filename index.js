const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const auth = require('./auth');
const routes = require('./routes');

// enable body parsing
app.use(bodyParser.json({extended: true}));

// set up sessions
app.use(session({
  secret: process.env.SECRET,
}));

passport.serializeUser(function(user, done){

});

passport.deserializeUser(function(user, done){

});

passport.use(new LocalStrategy(function(username, password, done){
  // find the user with given username
  // hash password
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth/', auth(passport));
app.use('/api/', routes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server started on port 3000!');
});
