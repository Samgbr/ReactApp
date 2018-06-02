const express = require('express');
//Importing the keys to set to the DB
const mongoose = require('mongoose');
const keys = require('./config/keys');
//import Users.js to index file (this must be declared before passport.js
//bcz model is needed to execute the passport js file and no errors will occur)
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
//import cookie-session
const cookieSession = require('cookie-session');
require('./models/Users');

//import passport implememntations to index file
require('./services/passport');

const app = express();
app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production') {
  //Express will server as the production assets like occur
  //Main.js file and css.js file
  app.use(express.static('client/build'));
  //Express will serve the index.html file if the route is not recognized
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
