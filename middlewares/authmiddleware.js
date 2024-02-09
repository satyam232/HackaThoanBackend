const jwt = require('jsonwebtoken');
const userModel = require('../model/Counselors');

var checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            // verify token
            const { Userid } = jwt.verify(token, 'Ranashibanee1234');
            // get user from token
            
            req.user = await userModel.findById(Userid).select('-password');
            next(); // 
        } catch (err) {
            res.status(401).send({ "status": "Unauthorized user","Userid":UserId});
        }
    }

    if (!token) {
        res.status(401).send({ "status": "failed" });
    }
}

module.exports = checkUserAuth;
