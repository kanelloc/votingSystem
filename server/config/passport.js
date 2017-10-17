var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;

var Voter  =   require('../models/voter');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = 'secret';
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        Voter.findOne({_id: jwt_payload.voter._id}, function(err, voter) {
            if (err) {
                return done(err, false);
            }
            if (voter) {
                return done(null, voter);
            } else {
                return done(null, false);
            }
        });
    }));
}