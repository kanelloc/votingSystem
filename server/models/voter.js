var mongoose	=	require('mongoose');
var config		=	require('../config/database');
var bcrypt = require('bcrypt');


//- Candidate schema
const VoterSchema = mongoose.Schema({
	
	username: {
		type: String,
		required: true
	},

	email: {
		type: String,
		unique: true,
		required: true,
	},

	password: {
		type: String,
		required: true
	},

	VotingTokens: {
		type: Number,
		default: 100
	}

}, { collection: 'voters'});

const Voter	=	module.exports = mongoose.model('Voter', VoterSchema);

module.exports.comparePassword = function(candidatePassword, hash, callback){
    // Load hash from your password DB. 
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}