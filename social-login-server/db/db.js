const mongoose = require('mongoose');
require('dotenv').config()

let dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, error => {
    if (error) {
        console.log(`FAILED to connect using mongoose. ${error}`);
    } else {
        console.log(`Connected to DB server.`);
    }
});



module.exports = mongoose;