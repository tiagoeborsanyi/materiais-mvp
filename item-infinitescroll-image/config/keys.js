require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_PATH,
    secretOrKey: proccess.env.SECRET
}