import express  from "express";
import User from "../model/userModel.js";
import { errorHandler } from "../utils/error.js";

export const signup = async(req, res, next)=>{
const {username, email, password} = req.body;
if(!username || !email || !password ){
    next (errorHandler(400, "all field are reqiure"))
}}