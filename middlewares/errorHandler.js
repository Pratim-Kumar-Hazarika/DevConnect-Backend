function errorHandler(err,req,next){
    res.status(400).json({message:`Something broke !! ${err.message}`})
}
module.exports = {errorHandler}