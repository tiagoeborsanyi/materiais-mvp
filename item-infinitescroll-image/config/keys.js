module.exports = {
    mongoURI: `mongodb://${proccess.env.USER_BD}:${proccess.env.PASS_BD}@${proccess.env.PATH_BD}/${proccess.env.NAME_BD}`,
    secretOrKey: proccess.env.SECRET
}