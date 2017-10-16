const express   =   require('express');
const router    =   express.Router();
const passport  =   require('passport');
const jwt       =   require('jsonwebtoken');
var bcrypt      =   require('bcryptjs');

//- Models
const Candidate  =   require('../../models/candidate');


/**
 * Register Candidate (POST)
 */
router.post('/register', (req, res, next) => {
    var email       = req.body.email;
    var username    = req.body.username;
    var password    = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash_password = bcrypt.hashSync(password, salt);

    var newCandidate =   new Candidate({
        username: username,
        email: email,
        password: hash_password
    });

    newCandidate.save(function(err) {
        if (err) {
            if (err.name == 'MongoError')
            res.json({success: false, msg:'Email already exists'});
        } else {
            res.json({success: true, msg:'Candidate registered'});
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
    Candidate.findOne({email: email}, (err, candidate) =>{
        if (err) throw err;
        if (!candidate) {
            return res.json({success: false, msg: 'Candidate not found'});
        }
        Candidate.comparePassword(password, candidate.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                var token = jwt.sign({candidate}, 'secret', {
                    expiresIn: 604800
                });

                res.json({
                success: true, 
                token:'JWT '+token,
                msg:'You are now loged in',
                candidate: {
                    id: candidate._id,
                    username: candidate.username,
                    email: candidate.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }   
        });
    });
});


module.exports	=	router;