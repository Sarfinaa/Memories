//hash passwords
import bcrypt from 'bcryptjs';
//store user info for some period of time in computer
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
export const signin=async (req,res)=>{
const {email,password} =req.body;
try{
const existingUser=await User.findOne({email});
if(!existingUser) return res.status(404).json({messagae:"User does't exist.Please signup"})
const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
if(!isPasswordCorrect) return res.status(404).json({message:"Invalid Credentials"});
//second argument in sign should be secret so it should be stored in env file
const token=jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1hr"});
res.status(200).json({result:existingUser,token:token});
}catch(error){
res.status(500).json({message:"Something went wrong"});
}
}
export const signup=async (req,res)=>{
    //when we throw post req from front end we get things in res.body and we can use data here!
    const {email,password,firstName,lastName,confirmPassword}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exists"});
        if(password!==confirmPassword) return res.status(400).json({message:"Passwords don't match "});
        const hashedPassword=await bcrypt.hash(password,12);
        const result=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});
        const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1hr"});
        res.status(200).json({result:result,token:token});
    }catch(error){
        res.status(500).json({message:"Something went wrong"});

    }
}