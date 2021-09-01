const express = require("express");
const userRouter = new express.Router();
const auth = require('../middleware/auth')


const User = require("../models/users");

userRouter.post("/user/signup" ,async (req,res) =>{

    const userUp = new User(req.body)
    try{
       await userUp.save()
       const token = await userUp.generateToken()
       res.status(200).send({userUp,token})
    }
    catch(e){
        console.log(e)
        res.status(400).send(e )
    }
 
});


userRouter.post('/user/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.send({user,token})
    }
    catch(e){
        res.send("Try again " + e)
    }
});


module.exports = userRouter ;
