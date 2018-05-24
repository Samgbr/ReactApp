const express = require('express');
//Importing the keys to set to the DB
const mongoose = require('mongoose');
const keys = require('./config/keys');
//import Users.js to index file (this must be declared before passport.js
//bcz model is needed to execute the passport js file and no errors will occur)
const passport = require('passport');
//import cookie-session
const cookieSession = require('cookie-session');
require('./models/Users');

//import passport implememntations to index file
require('./services/passport');

const app = express();
//need to make cookies for passport
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //expires after 30 days
    //Encrypt our cookie
    keys: [keys.cookieKey]
  })
);
//Let passport use the cookies
app.use(passport.initialize());
app.use(passport.session());

//connect to the database
mongoose.connect(keys.mongoURI);

require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT);
