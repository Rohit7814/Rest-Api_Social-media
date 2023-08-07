import User from "../model/User";
import bcrypt from "bcryptjs"; 

export const getAllUser=async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
      return  console.log(err);
    }
    if(!users){
        res.status(404).json({message:"no user Found"});
    }
    return res.status(200).json({ users });
}


export const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;


    let exitingUser;
    try{
        exitingUser=await User.findOne({email});
    }catch(err){
console.log(err);
    }
    if(exitingUser){
        return res.status(400).json({message:"User already exits! do login"});
    }
    const hashedPassword=bcrypt.hashSync(password);
    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs:[],
    });
    
    try{
      await  user.save();
    }catch(err){
    return     console.log(err);
    }
    return res.status(201).json({user});
}


export const login=async(req,res,next)=>{
const {email,password}=req.body;
let exitingUser;
try{
    exitingUser=await User.findOne({email});
}catch(err){
console.log(err);
}
if(!exitingUser){
    return res.status(404).json({message:"Couldnt find User by this email"});
}
const isPasswordCorrect=bcrypt.compareSync(password,exitingUser.password);
if(!isPasswordCorrect){
    return res.status(400).json({message:"Incorrect Password"});
}
return res.status(200).json({message:"login Successful"});
}



