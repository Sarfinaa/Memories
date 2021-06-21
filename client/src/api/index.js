import axios from 'axios';
const API=axios.create({baseURL:"http://localhost:5000"});
//middleware dont work without it and it happen on each request
API.interceptors.request.use((req)=>{
if(localStorage.getItem('profile')){
    //as we are taking headers.Authorization in auth.js in backend folder
    //adding token to each request
req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
}
return req;
});
export const fetchPost=(id)=> API.get(`/posts/${id}`);

//getting data from above url from backend
export const fetchPosts=(page)=>API.get(`/posts?page=${page}`);
//query parameter-starts with ? and and we specify variable name=something
export const fetchPostsBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`) ;
//sending new post to server then databse   
export const createPost=(newPost)=>API.post('/posts',newPost);
export const updatePost=(id,updatedPost)=>API.patch(`${'/posts'}/${id}`,updatedPost);
export const deletePost=(id)=> API.delete(`${'/posts'}/${id}` );
export const likePost=(id)=>API.patch(`${'/posts'}/${id}/likePost`);
export const signIn=(formData)=>API.post('/user/signin',formData);
export const signUp=(formData)=>API.post('/user/signup',formData);
