const passport = require('passport');  //requiring the passport module to execute

//export the app object
module.exports = (app) => {
  //Create a route handler for /auth/google
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  })
  );

  //create a route handler for /auth/google/callback
  app.get('/auth/google/callback', passport.authenticate('google'));

  //get request for logout
  app.get('/api/logout', (req, res) => {
    //req has a passport function called logout()
    req.logout();  //cookies will expires
    res.send(req.user); //no user seen
  });

  //Get access to the user
  app.get('/api/current_user', (req,res) => {
    res.send(req.user); //returns user detail from the DB
  });
};
