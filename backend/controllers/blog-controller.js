import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";
import { json } from "express";

export const getAllBlogs=async(req,res,next)=>{
    let blogs;
    try{
blogs=await Blog.find();
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"no Blogs found"});
    }

return res.status(200).json({blogs});

}

export const addBlog=async(req,res,next) => {
const {title,description,image,user}=req.body;
let exitingUser;
try{
exitingUser=await User.findById(user);
}catch(err){
console.log(err);
}
if(!exitingUser){
    return res.status(500).json({message:"unable to find user by this id"});
}
const blog=new Blog({
    title,description,image,user
});
try{
const session=await mongoose.startSession();
session.startTransaction();
await blog.save({session});
exitingUser.blogs.push(blog);
await exitingUser.save({session});
await session.commitTransaction();
}catch(err){
console.log(err);
return res.status(500),json({message:err});
}
return res.status(200).json({blog});
};

export const updateBlog=async(req,res,next)=>{
    const {title,description}=req.body;
    const blogId=req.params.id;
    let blog;
    try{
         blog=await Blog.findByIdAndUpdate(blogId,{
            title,description
        });
    }catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(100).json({message:"unable to update the blog"});
    }
    return res.status(200).json({blog});

}

export const getById=async(req,res,next)=>{
    const id=req.params.id;
    let blog;
    try{
        blog=await Blog.findById(id);
    }catch(err){
        console.log(err);
    }
if(!blog){
    return res.status(404).json({message:"no blog found"});
}

return res.status(200).json({blog});
}

export const deleteBlog=async(req,res,next)=>{
    const id = req.params.id ;
    let blog;
    try{
blog=await Blog.findByIdAndDelete(id).populate('user');
await blog.user.blogs.pull(blog);
await blog.user.save();
    }catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"no blog with this id"});
    }
    return res.status(200).json({blog});
}

export const getByUserId=async(req,res,next)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");
    }catch(err){
       return  console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:"not found"});
    }
    return res.status(200).json({blogs:userBlogs});
}