require('dotenv').config()
const JWT = require("jsonwebtoken")
const screte = process.env.jwtSecret
console.log(screte)
exports.authMiddleWare = (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        var token = req.headers.authorization
        JWT.verify(token, screte, function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    message: "unauthorized"
                })

            }
            req._id=decoded._id
            console.log(decoded,"test") // bar
        });
        next()
    }
    catch (e) {

    }

}