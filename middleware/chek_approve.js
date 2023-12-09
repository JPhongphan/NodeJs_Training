const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split("Bearer ")[1];    //Get token from header client
        const decoded = jwt.verify(token, process.env.JWT_KEY);         //Decode token
        req.auth = decoded;
        if(req.auth.ApproveStatus != true){
            throw new Error(true)
        }
        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Your user has not been approved.'
        })
    }
}