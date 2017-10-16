var express	=	require('express');
var router	=	express.Router();

var jwt   =   require('jsonwebtoken');
var config = require('../config/database');

var Voters   =	require('../models/voter');

//- User profile
router.get('/profile', checkToken, (req, res, next) => {
	res.send('Voter profile');
});

router.get('/voters', (req, res, next) => {
	Voters.find({}, function (err, voters) {

		if (err) {
			console.log(err);
		} else {
			res.send(voters);
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