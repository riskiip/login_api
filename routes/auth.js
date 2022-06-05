const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authSchema = require('../models/data-model');
const secretKey = 'HAHdfnejfkanaljk22234alkl';
const verify = require('../auth/verifyToken');

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    await authSchema.findOne({email: email}).then(existUser => {
        console.log('Exist user: ' + existUser);
        if (existUser && existUser._id) {
            bcrypt.compare(password, existUser.password, function (err, response) {
                if (!err) {
                    if (response) {
                     const authToken = jwt.sign({_id: existUser.id, email: existUser.email}, secretKey, {expiresIn: '1h'});
                     res.json({
                         status: 'ok',
                         data: {authToken, existUser, response}
                     })
                    } else if (!response) {
                        res.json({
                            status: 'ok',
                            data: {existUser, response}
                        })
                    }
                }
            })
        }
    }).catch(err => {
        res.json({
            status: 'error',
            data: 'Ada error nih'
        })
    })
});

router.post('/register', async (req, res) => {
    const registerBody = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        dob: req.body.dob
    }

    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(req.body.password, salt).then((hashPassword) => {
        if (hashPassword) {
            registerBody.password = hashPassword
        }
    });

    await authSchema.create(registerBody).then((userData) => {
        if (userData && userData._id) {
            console.log('Registration complete ' + userData);
            res.json({
                status: 'ok',
                data: userData
            })
        }
    }).catch((err) => {
        if (err) {
            res.json({
                status: error,
                data: err
            })
        }
    })
})

router.get('/dashboard', verify, async(req,res) => {
    if (req && req.decodedToken) {
        res.json({
            status: 'ok',
            data: 'ok'
        })
    } else {
        res.json({
            status: 'error',
            data: ''
        })
    }
})
module.exports = router;
