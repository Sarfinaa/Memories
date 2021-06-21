import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
export const getPost=async (req,res)=>{
       const {id}=req.params;
       try {
              const post=await PostMessage.findById(id);
              res.status(200).json(post);
       } catch (error) {
              res.status(404).json({message:error.message});
       }
}

export const getPosts= async (req,res)=>{
       const {page} =req.query;
       try{
              //no of post per page
              const LIMIT=8;
              const startIndex=(Number(page)-1)*8;//getting starting index of every page
               const total=await PostMessage.countDocuments({}); 
               //sort by newest post  and we skip posts before page 2 as we want to fetch only page 2 data
              const posts=await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
  } catch(error){ 
res.status(404).json({message:error.message});
 }
    }

    //query => /posts?page=1 ->page=1 ,we use query to query some data
    //params=>/posts/:id||123 -> id=123 , we use params to get a specific resourse
    export const getPostsBySearch= async(req,res)=>{
     //getting data from front end
       const {searchQuery,tags}=req.query;
       try {
            //we convert our query in regular expression as it is easy for mongodb to search database
              const title=new RegExp(searchQuery,'i');//i means ignoring cases like test and Test
              //$or means either find me post with title or with query
              //tags:{$in} means is there is tag in this tags that matches our query 
              //find posts with matches title or tags
              const posts=await PostMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]});
               res.json({data:posts});    

     } catch (error) {
            res.status(404).json({message:error.message});
     }      
    }

    export const createPost=async (req,res)=>{
           //sendinng data to this page and req.body contains those data thats why we are storing it
       const post=req.body;
       const newPost=new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
        try{
await newPost.save();
res.status(201).json(newPost);
       }catch(error){
res.status(409).json({message:error.message});
       }
        }
    export const updatePost=async(req,res)=>{
           const {id:_id}=req.params;
           const post=req.body;
           if(!mongoose.Types.ObjectId.isValid(_id)) {
           return res.status(404).send('No post with that Id');
           }
         const updatedPost= await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
         res.json(updatedPost);
    }
    export const deletePost = async(req,res)=>{
           const {id}=req.params;
           if(!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(404).send('No post with that Id');
              }
           
              await PostMessage.findByIdAndRemove(id);
              res.json({message:'Post deleted successfully'});
    }
    export const likePost = async(req,res)=>{
const {id}=req.params;
//first checking user is authenticated or not
if(!req.userId) return res.json({message:"Unauthenticated"});
//checks that post is there that user wants to like
if(!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).send('No post with that Id');
       }
       //getting actual post
       const post=await PostMessage.findById(id);
     const index=post.likes.findIndex((id)=>{
return id===String(req.userId)
     })
     if(index===-1){
post.likes.push(req.userId);
     }else{
            //remove user who liked the post
post.likes=post.likes.filter((id)=>id!==String(req.userId));
     }
       const updatedPost= await PostMessage.findByIdAndUpdate(id,post,{new:true});
res.json(updatedPost);
    }