const jwt = require('jsonwebtoken');
const secretKey = 'HAHdfnejfkanaljk22234alkl';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log('Token nya: ' + token);

    if (!token) {
        res.status(403).send('Harus ada token nya nih');
    } else {
        jwt.verify(token, secretKey, (err, response) => {
            if (!err) {
                req.decodedToken = decodedToken;
            } else if (err) {
                res.status(403).send(err);
            }
        })
        // try {
        //     const decodedToken = jwt.verify(token, secretKey)
        //     req.decodedToken = decodedToken;
        // } catch {
        //     res.json({
        //         status: 'error',
        //         data: 'Error saat verify token'
        //     })
        // }
    }

    return next();
}

module.exports = verifyToken;

