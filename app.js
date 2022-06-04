const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost/loginData";
const appAuth = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/auth', appAuth)
mongoose.connect(mongoURI);
mongoose.connection.on('open', () => {
    console.log('Connect to mongodb')
});

app.listen(3000, (err) => {
    if (!err) {
        console.log('Hello World')
    }
})
