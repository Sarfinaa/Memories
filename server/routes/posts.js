import express from 'express';
import {getPostsBySearch,getPost,getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js';
const router=express.Router();
import auth from '../middleware/auth.js';
//if we get 'get' request we run getPost method and same for post method.
router.get('/search',getPostsBySearch);
router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
export default router;