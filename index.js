require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const { initializeDbConnection } = require('./dbConnect/db.connection');
const port = process.env.PORT || 3003


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

initializeDbConnection()

app.get("/",(req,res)=>{
    res.json("Welcome to DevConnect Server !!")
})

app.listen(process.env.PORT || port ,()=>{
    console.log(`Server started at port ${port}!!`)
})