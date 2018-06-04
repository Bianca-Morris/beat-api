const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');

const models = require('./models/models')
const auth = require('./auth');
const routes = require('./routes');
const hash = require('./hash');

// connect to mongo db for storing sessions
const connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(connect);
const mongoStore = require('connect-mongo')(session);

// set up sessions
app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy((username, password, done) => {
  // hash password
  const hashedPassword = hash(password);
  // find the user with given username
  models.User.findOne({ username, password: hashedPassword }, (err, user) => {
   if (err) {
     return done(err);
   }
   if (!user) {
     return done(null, false, { message: 'Incorrect username.'});
   }
   return done(null, user);
  })

}));

app.use(passport.initialize());
app.use(passport.session());


// enable body parsing
app.use(bodyParser.json({ extended: true }));

// define routes
app.use('/api/auth/', auth(passport));
app.use('/api/', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000!');
});
