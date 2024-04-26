const express = require('express');
const router = express.Router();
const {User: Users} = require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


////////////////////////////////////////////////////////////////////////////////////////////////////////
//register user of system
router.post('/register',(req,res) =>{
    //To register user
    const {uName , uEmail, uPw} = req.body;
    if(!uName || !uEmail || !uPw){
        return res.status(400).json({msg:'Please Fill All Fields'});
    }

    Users.findOne({uName}).then(user => {
        if(user){
            return res.status(400).json({msg : 'Username Already Exist'})
        }
    });

    Users.findOne({uEmail}).then(user => {
        if(user){
            return res.status(400).json({msg : 'Email Already Exist'})
        }
    });


    const user = new Users(req.body);
    /*pw hashing*/
    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(user.uPw, saltRounds, function(error, hash) {
            if (error) {
                throw err;
            }
            user.uPw = hash;

            user.save().then(user  => {

                jwt.sign(
                    {_id : user._id}, "secret", {expiresIn: 10},
                    (error, token) =>{
                        if(error) {
                            throw error;
                        }
                        res.json({
                            token,
                            user: {
                                _id: user._id,
                                uName: user.uName,
                                uEmail: user.uEmail
                            }
                        });
                    }
                );
            });

        });

    });



});

////////////////////////////////////////////////////////////////////////////////////////////////
//login
router.post('/login', (req,res) =>{

    //To login user

    const {uName , uPw} = req.body;
    if(!uName || !uPw){
        return res.status(400).json({msg:'Please Fill All Fields'});
    }

    Users.findOne({uName}).then(user => {
        if(!user){
            return res.status(400).json({msg : 'Invalid Username'})
        }
        /*pw checking, hash passwords are checked here*/
        bcrypt.compare(uPw, user.uPw).then(result => {
            if(!result){
                return res.status(400).json({
                    msg:'Invalid Credentials'
                });

            }

            jwt.sign(
                {_id : user._id}, "secret", {expiresIn: 3500},
                (error, token) =>{
                    if(error) {
                        throw error;
                    }
                    res.json({
                        token,
                        user: {
                            _id: user._id,
                            uName: user.uName,
                            uEmail: user.uEmail
                        }
                    });
                }
            );
        });


    });


});

/////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/get/user', auth, (req, res) => {
    Users.findById(req.user._id).select('-uPw').then(user => res.json(user));
});

module.exports = router;