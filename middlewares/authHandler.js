const jwt = require("jsonwebtoken")
const mySecret = process.env.MY_SECRET_KEY;

function userLogger(req,res,next){
    const token = req.headers.authorization;
    try {
        const decode = jwt.verify(token,mySecret);
        req.user = {decodedValues : decode}
        return next()
    } catch (error) {
       return res.status(401).json({message:"Unauthorized login please add token"}) 
    }
}


module.exports = { userLogger };