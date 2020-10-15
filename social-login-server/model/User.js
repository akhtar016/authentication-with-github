const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.Promise = global.Promise;


const userSchema = new Schema({
    name: String,
    userName: String,
    socialID: String,
    profileImageUrl: String
  });
  
  const SocialUser = mongoose.model("SocialUser", userSchema);
  
  module.exports = SocialUser;