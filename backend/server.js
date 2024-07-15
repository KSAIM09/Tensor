const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Intercom = require('intercom-client');
require('dotenv').config();

// Import the User model
const User = require('./models/Users');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/customer_service', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const PORT = process.env.PORT || 5000;

// Intercom client setup
const intercom = new Intercom.Client({ token: process.env.INTERCOM_ACCESS_TOKEN });

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Google OAuth setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback'
},
(token, tokenSecret, profile, done) => {
  User.findOneAndUpdate(
    { googleId: profile.id },
    { googleId: profile.id, name: profile.displayName, email: profile.emails[0].value },
    { new: true, upsert: true },
    (err, user) => {
      return done(err, user);
    }
  );
}));

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.post('/api/requests', (req, res) => {
  const { category, comments } = req.body;

  intercom.messages.create({
    message_type: 'inapp',
    body: comments,
    from: { type: 'user', id: req.user.id },
    to: { type: 'admin', id: 'YOUR_ADMIN_ID' },
    subject: category
  }).then(() => {
    res.status(200).send('Request submitted');
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

app.get('/api/requests/:category', (req, res) => {
  const category = req.params.category;

  intercom.messages.list()
    .then(messages => {
      const filteredMessages = messages.filter(msg => msg.subject === category);
      res.status(200).json(filteredMessages);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
