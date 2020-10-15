const express = require("express");
const app = express();
const passport = require("passport");
const authRoutes = require('./routes/authRoute');
const passportSetup = require('./config/passport')
const cors = require("cors");
const cookieParser = require("cookie-parser"); // parse cookie header
require('./db/db')
require('dotenv').config()
const cookieSession = require('cookie-session');


app.use(
    cookieSession({
      name: "session",
      keys: [process.env.COOKIE_KEY],
      maxAge: 24 * 60 * 60 * 100
    })
  );
  
  // parse cookies
  app.use(cookieParser());
  
  // initalize passport
  app.use(passport.initialize());
  // deserialize cookie from the browser
  app.use(passport.session());
  
  
  // set up cors to allow us to accept requests from our client
  app.use(
    cors({
      origin: "http://localhost:3000", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    })
  );
  
  // set up routes
  app.use("/auth", authRoutes);
  
  
  
  const authCheck = (req, res, next) => {
    if (!req.user) {
      
      res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated"
      });
    } else {
      
      next();
    }
  };
  
  // if it's already login, send the profile response,
  // otherwise, send a 401 response that the user is not authenticated
  // authCheck before navigating to home page
  app.get("/", authCheck, (req, res) => {
    
    res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  });


module.exports = app;
