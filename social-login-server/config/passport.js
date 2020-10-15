const passport = require("passport");
const GitHubStrategy = require('passport-github');
const SocialUser = require("../model/User");
require('dotenv').config()


// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  SocialUser.findById(id)
    .then(user => {
      
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/redirect"
    },
    async (token, tokenSecret, profile, done) => {
      
      
      // find current user in UserModel
      const currentUser = await SocialUser.findOne({
        socialID: profile._json.id
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new SocialUser({
          name: profile._json.name,
          userName: profile._json.login,
          socialID: profile._json.id,
          profileImageUrl: profile._json.avatar_url
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      } else {

        done(null, currentUser);
      }
    }
  )
);
