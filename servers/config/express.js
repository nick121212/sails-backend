var passport = require('passport')
    , GitHubStrategy = require('passport-github').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , TwitterStrategy = require('passport-twitter').Strategy
    , QQStrategy = require('passport-qq').Strategy
    , LocalStrategy = require('passport-local').Strategy;

var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
        User.findOne({ id: profile.id }, function (err, user) {
            console.log(user);
            if (user) {
                return done(null, user);
            } else {
                var data = {
                    provider: profile.provider,
                    id: profile.id,
                    name: profile.displayName
                };

                if (profile.emails && profile.emails[0] && profile.emails[0].value) {
                    data.email = profile.emails[0].value;
                }
                if (profile.name && profile.name.givenName) {
                    data.firstname = profile.name.givenName;
                }
                if (profile.name && profile.name.familyName) {
                    data.lastname = profile.name.familyName;
                }

                User.create(data, function (err, user) {
                    return done(err, user);
                });
            }
        });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (uid, done) {
    User.findOne({ id: uid }, function (err, user) {
        done(err, user);
    });
});

/**
 * Configure advanced options for the Express server inside of Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#documentation
 */
module.exports.http = {

    customMiddleware: function (app) {

        passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }

                if (!HashService.bcrypt.compareSync(password, user.password)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }));

        passport.use(new QQStrategy({
            clientID: '1105011605',
            clientSecret: 'SN0MIfYPztoi0qe0',
            callbackURL: "http://localhost:1337/auth/qq/callback"
        }, verifyHandler));

        passport.use(new GitHubStrategy({
            clientID: "YOUR_CLIENT_ID",
            clientSecret: "YOUR_CLIENT_SECRET",
            callbackURL: "http://localhost:1337/auth/github/callback"
        }, verifyHandler));

        passport.use(new FacebookStrategy({
            clientID: "628552867282419",
            clientSecret: "04c6ca9e85fb8adf918f57561f27dde3",
            callbackURL: "http://localhost:1337/auth/facebook/callback"
        }, verifyHandler));

        passport.use(new GoogleStrategy({
            clientID: 'YOUR_CLIENT_ID',
            clientSecret: 'YOUR_CLIENT_SECRET',
            callbackURL: 'http://localhost:1337/auth/google/callback'
        }, verifyHandler));

        passport.use(new TwitterStrategy({
            consumerKey: 'YOUR_CLIENT_ID',
            consumerSecret: 'YOUR_CLIENT_SECRET',
            callbackURL: 'http://localhost:1337/auth/twitter/callback'
        }, verifyHandler));

        app.use(passport.initialize());
        app.use(passport.session());
    }
};
