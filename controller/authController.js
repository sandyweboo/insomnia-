import express  from "express";
import User from "../model/userModel.js";
import { errorHandler } from "../utils/error.js";

export const signup = async(req, res, next)=>{
const {username, email, password} = req.body;
if(!username || !email || !password || username === '' || email === '' || password === ''){
    next (errorHandler(400, "all field are reqiure"))
}
const newUser = new User({
    username,
    email,
    password
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
    } else if (password !== validUser.password) {
        return next(errorHandler(401, "Invalid password"));
    } else {
        // Authentication successful, you may want to generate and send a token here
        res.json(validUser);
    }
    
    
} catch (error) {
    next(error)
}

}