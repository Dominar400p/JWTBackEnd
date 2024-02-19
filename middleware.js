let jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    try{
        let token =  req.header('x-token')
        if(!token){
            res.status(400).json('Token Not Found')
        }
        else{
            let decode = jwt.verify(token, 'protected')
            req.user = decode.user
            next()
        }
    }
    catch(err){
        console.log(err.message)
        res.status(404).json('server error')
    }
}