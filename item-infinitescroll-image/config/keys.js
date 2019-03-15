require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_PATH,
    secretOrKey: process.env.SECRET
}