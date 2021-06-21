import {FETCH_ALL,FETCH_POST,START_LOADING,END_LOADING,LIKE,UPDATE,DELETE,CREATE,FETCH_BY_SEARCH} from '../constants/actionTypes'
import * as api from '../api/index';
//used async because we are fetching data so its takes time that why we are using async and thunk 
export const getPosts =(page) =>async(dispatch)=>{
    try{
        //Getting data from backend and setting that data to paylaod
        dispatch({type:START_LOADING});
        const {data}=await api.fetchPosts(page);
        
    //When it dispatch action it goes to app.js 
            dispatch({ type:FETCH_ALL,payload:data});
            dispatch({type:END_LOADING});
    }catch(error){
console.log(error);
    }
} //fetching single post
export const getPost =(id) =>async(dispatch)=>{
    try{
        //Getting data from backend and setting that data to paylaod
        dispatch({type:START_LOADING});
        const {data}=await api.fetchPost(id);
        
    //When it dispatch action it goes to app.js 
            dispatch({ type:FETCH_POST,payload:data});
            dispatch({type:END_LOADING});
    }catch(error){
console.log(error);
    }
}
export const getPostsBySearch=(searchQuery)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
        dispatch({ type:FETCH_BY_SEARCH,payload:data});
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const createPost=(post)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING});
        //post api request and sending post
        const {data}=await api.createPost(post);
        dispatch({type:CREATE,payload:data});
        dispatch({type:END_LOADING});
    }catch(error){
console.log(error);
    }
}
export const updatePost=(id,post)=>async(dispatch)=>{
    try{
        const {data} =await api.updatePost(id,post);
        dispatch({type:UPDATE,payload:data});
    }catch(error){
        console.log(error);
    }
}
export const deletePost=(id)=> async(dispatch)=>{
    try{
await api.deletePost(id);
dispatch({type:DELETE,payload:id});
    }catch(error){
        console.log(error)

    }
}
export const likePost = (id) => async (dispatch)=>{
    try{
        const {data} =await api.likePost(id);
        dispatch({type:LIKE,payload:data});
    }catch(error){
        console.log(error);
    }
}