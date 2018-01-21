var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        var err = null; // normally there would be error handling
        done(err, user);
    });

    passport.deserializeUser(function(user, done) {
        var err = null; // normally there would be error handling
        done(err, user);
    });

    passport.serializeUser(function(user, done) {
        var err = null; // normally there would be error handling
        done(err, user);
    });

    require('./strategies/local.strategy')();
};
