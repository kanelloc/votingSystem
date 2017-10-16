var mongoose	=	require('mongoose');
var config		=	require('../config/database');
var bcrypt		=	require('bcrypt');


//- Candidate schema
const CandidateSchema = mongoose.Schema({
	
	username: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},

	totalVotes: {
		type: Number,
		default: 0
	}

});

const Candidate	=	module.exports = mongoose.model('Candidate', CandidateSchema);

module.exports.comparePassword = function(candidatePassword, hash, callback){
    // Load hash from your password DB. 
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}