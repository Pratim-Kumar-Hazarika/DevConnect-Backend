function routeHandler(req,res){
    res.status(500).json({message:"The route you are requesting doesn't exist"})
}

module.exports = {routeHandler}