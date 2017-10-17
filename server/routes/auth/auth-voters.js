const express   =   require('express');
const router    =   express.Router();
const passport  =   require('passport');
const jwt       =   require('jsonwebtoken');
var bcrypt      =   require('bcryptjs');

var config = require('../../config/database');

//- Models
const Voter  =   require('../../models/voter');


/**
 * Register Candidate (POST)
 */
router.post('/register', (req, res, next) => {
    var email       = req.body.email;
    var username    = req.body.username;
    var password    = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash_password = bcrypt.hashSync(password, salt);

    var newVoter =   new Voter({
        username: username,
        email: email,
        password: hash_password
    });

    newVoter.save(function(err) {
        if (err) {
            if (err.name == 'MongoError')
            res.json({success: false, msg:'Email already exists'});
        } else {
            res.json({success: true, msg:'Voter registered'});
        }
    });
});


/**
 *  Login Voter (POST)
 */
router.post('/login', (req, res, next) => {
    var email    = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    Voter.findOne({email: email}, (err, voter) =>{
        if (err) throw err;
        if (!voter) {
            return res.json({success: false, msg: 'Voter not found'});
        }
        Voter.comparePassword(password, voter.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                var token = jwt.sign({voter}, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                success: true, 
                token:'JWT '+token,
                msg:'You are now loged in',
                voter: {
                    id: voter._id,
                    username: voter.username,
                    email: voter.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }   
        });
    });
});

module.exports	=	router;