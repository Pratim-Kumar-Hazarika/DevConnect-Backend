const bcrypt = require("bcryptjs/dist/bcrypt");
const { User } = require("../models/user.model");
const jwt = require('jsonwebtoken');
const mySecret = process.env.MY_SECRET_KEY

exports.get_all_users = async(req,res)=>{
    try {
        const users = await User.find({})
        res.json({sucess:true,message:"Users from db are..",users})
    } catch (error) {
        res.json({message:"error occured while getting the users"})
    }
}

exports.add_user = async(req,res)=>{
    try{
      const findUser = await User.find({email:req.body.email})
      if(findUser.length >=1){
        return res.status(500).json({message:"Email-ID already exists in the DB!!"})
      }
      const passwordHashed = await bcrypt.hash(req.body.password,12);
      const NewUser = new User({
        ...req.body,password:passwordHashed
      })
      const savedUser = await NewUser.save()
      res.json({message:"User saved to DB!!"})
    }catch{
      res.status(500).json({message:"Error occured while adding the user to DB!!"})
    }
  }

  exports.user_login = async(req,res)=>{
    const user = await User.find({email:req.body.email})
    if(user){
        const checkPassword = await bcrypt.compare(req.body.password,user[0].password)
        if(checkPassword){
          const token = await jwt.sign({userId: user[0]._id,name:user[0].name},mySecret,{expiresIn:"24h"})
          res.json({token,userId : user[0]._id})
        }else{
         return  res.status(401).json({message:"Please enter correct Password !!"})
        }
    }
  }
  