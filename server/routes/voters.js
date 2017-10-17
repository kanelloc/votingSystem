var express	=	require('express');
var router	=	express.Router();

var jwt   =   require('jsonwebtoken');
const passport  =   require('passport');
var config = require('../config/database');

var Voters   =	require('../models/voter');
var Candidates = require('../models/candidate');

// //- User profile
// router.get('/profile', checkToken, (req, res, next) => {
// 	res.json({user: req.user});
// });

/**
 * Profile Page (GET)
 */
router.get("/profile", passport.authenticate('jwt', { session: false }), function(req, res, next){
  res.json({user: req.user});
});

router.post("/vote", passport.authenticate('jwt', {session: false}), function(req, res, next) {
    voter_infos = {user: req.user};
    candidate_username = req.body.username;
    candidate_id = req.body.cid;
    candidate_votes = req.body.votes;
    if (!candidate_id && !candidate_votes ) {
        res.send({success:false, msg:"Fill the slots"});
    }else if (candidate_votes > voter_infos.user.VotingTokens) {
        res.send({success:false, msg:"You dont have enough votikng tokens"});
    } else{
        Candidates.findById(candidate_id, (err, candidate) => {
        if (err) {
            console.log(err);
            res.send({success:false, msg:"ERROR"});
        } else {
            remaining_votes = voter_infos.user.VotingTokens - candidate_votes;
            candidate.totalVotes += candidate_votes;
            Voters.update({_id: voter_infos.user._id}, {$set: { VotingTokens: remaining_votes }}, (err, msg) => {
                console.log(err);
            });
            candidate.save(function (err, updatedCandidate) {
                if (err) return handleError(err);
                console.log(voter_infos.user.VotingTokens);
                res.send({success:true, msg:"Vote submited"});
              });
            }
        });
    }
    
});

router.get('/candidates',passport.authenticate('jwt', { session: false }), (req, res, next) => {
	Candidates.find({}, function (err, candidates) {

		if (err) {
			console.log(err);
		} else {
			res.send(candidates);
		}
	});
});

function checkToken(req, res, next) {
    var token = req.headers['authorization'];
    jwt.verify(token, config.secret, (err, data) => {
        if (err){
            res.status(401).json({error: 'No Voter Authorization'});
        }
        else{
            res.locals = data;
            next();
        } 
    });
}

module.exports	=	router;