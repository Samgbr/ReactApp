const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require ('../config/keys'); // There is no need to add extension file
//import mongoose
const mongoose = require('mongoose');
//import users model
const User = mongoose.model('users');

//Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);  //user.id refers to id created automatically by mongodb record instance not the googleID
});
//Deserialize user and id refers to unique id created automatically by the mongodb
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// console.developers.google.com
//We have to query if the profile exists or not on the DB to eliminate redundancy
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  //Check if the ID exists or not and
  //this query does not return a const but a promise (used to handle asynchronous code)
  User.findOne({googleID: profile.id})
  //promise
    .then((existingUser) => {
      if(existingUser) {
        //We don't have to create a new user ID
        //The done function tells when finished , null shows that we are done without any errors
        done(null, existingUser);  //err is represente by null
      } else {
        //We have to crate a new user on our DB
        //create a new user and save profile id instance
        //promise
        //Here we have to make sure the user record is created before calling done
        new User ({ googleID: profile.id})  //only creates a model instance
        .save()   //saves
        .then(user => done(null, user)); //user refers to the same model created
      }
    });
  console.log('accessToken: ', accessToken);
  console.log('refreshToken: ', refreshToken);
  console.log('profile ', profile);
}));
