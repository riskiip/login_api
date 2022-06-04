const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authSchema = require('../models/data-model');

router.post('/login', (req, res) => {

});

router.post('/register', async(req,res) => {
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
        if(err) {
            res.json({
                status: error,
                data: err
            })
        }
    })
})

module.exports = router;
