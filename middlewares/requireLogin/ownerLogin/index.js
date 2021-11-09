const jwt = require('jsonwebtoken');
jwt_owner_key = 'this-secret-key-has-been-maden-for-owner'



module.exports = async (req, res, next) =>{
    if(!req.headers || !req.headers.authorization){
        res.status(400).send({
            msg : 'you request headers has not been provided correctly'
        })
        return
    }
    try {
        jwt.verify(req.headers.authorization.split(' ')[1], jwt_owner_key)
    } catch (error) {
        console.log(error)
            res.status(403).send({
                msg : 'access denied'
            })
        return
        }
    next()
}