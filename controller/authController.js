import express  from "express";
import User from "../model/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

const Jwt = jwt

export const signup = async(req, res, next)=>{
const {username, email, password} = req.body;
if(!username || !email || !password || username === '' || email === '' || password === ''){
    next (errorHandler(400, "all field are reqiure"))
}

const hash = bcrypt.hashSync(password, 8);
console.log(hash)
const newUser = new User({
    username,
    email,
    password:hash
}) 
try {
    await newUser.save();
    res.json("user add success")
} catch (error) {
   next(error) 
}
}

export const signin = async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password || email === '' || password === ''){
        next (errorHandler(400, "all field are reqiuress"))
    }
try {

    
    const validUser = await User.findOne({email})
  
    if (!validUser) {
        return next(errorHandler(401, "Invalid user"));
    } 
    const validPassword = bcrypt.compareSync(password, validUser.password)
    if (!validPassword) {
        return next(errorHandler(401, "Invalid password"));
    } else {
        const token = Jwt.sign({id:validUser._id},'sandy');
        // Authentication successful, you may want to generate and send a token here
       const {password : pass,...rest } = validUser._doc;
        res.status(200).cookie('access_token',token,{httpOnly:true})
        res.json(rest);
    }
    
    
} catch (error) {
    next(error)
}

}