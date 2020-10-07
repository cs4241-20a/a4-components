let GithubStrategy = require('passport-github2').Strategy
const User = require('../models/User')

module.exports = function(passport){
    const callbackURL = 'https://localhost:5000/users/signin/github/callback'

    passport.use(
        new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ name: profile.username })
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              user: profile.username
            })

            const savedUser = await newUser.save()

            done(null, savedUser)
        }
    } catch(error) { 
        done(error)
    }
}))


    passport.serializeUser((user, done) => {
        done(null, user._id);
      })
    
      passport.deserializeUser(async (id, done) => {
          try {
              let user = await User.findById(id)
              done(null, user)
          } catch(error) {
              done(error, null)
          }
      })

}