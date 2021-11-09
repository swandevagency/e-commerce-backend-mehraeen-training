const jwt = require('jsonwebtoken');        
jwt_user_key = 'we-will-make-this-one-different-for-users'



module.exports = async (req, res, next) =>{
    if(!req.headers || !req.headers.authorization){
        res.status(400).send({
            msg : 'you request headers has not been provided correctly'
        })
        return
    }
    try {
        jwt.verify(req.headers.authorization.split(' ')[1], jwt_user_key)
    } catch (error) {
        console.log(error)
            res.status(403).send({
                msg : 'you are not authenticated'
            })
        return
        }
    next()
}