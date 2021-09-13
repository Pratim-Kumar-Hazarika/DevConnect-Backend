require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const port = process.env.PORT || 3003
const { initializeDbConnection } = require('./dbConnect/db.connection');
const { errorHandler } = require('./middlewares/errorHandler');
const { routeHandler } = require('./middlewares/routeHandler');
const userRouter = require("./routes/user-router")
const allPostsRouter = require("./routes/posts-router")

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

initializeDbConnection()

app.get("/",(req,res)=>{
    res.json("Welcome to DevConnect Server !!")
})
app.use("/user",userRouter)
app.use("/posts",allPostsRouter)
app.use(errorHandler)
app.use(routeHandler)

app.listen(process.env.PORT || port ,()=>{
    console.log(`Server started at port ${port}!!`)
})