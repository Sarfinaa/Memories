//This file is made so that after sign in user can delete its post and like other posts
import jwt from 'jsonwebtoken';
const auth =async(req,res,next)=>{
    try {
 //Getting token from front end
        const token=req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;
        let decodedData;
        if(token && isCustomAuth){
            //it gives username of that person and id
            decodedData=jwt.verify(token,'test');
            req.userId=decodedData?decodedData.id:null; 
        }else{
            decodedData=jwt.decode(token);
            //sub-differentiate between user (google)
            req.userId=decodedData?decodedData.sub:null; 

        }
        next();
        //wants to like a  post 
        // click like=>auth middleware-to check user is genuine=> then like controller 

    } catch (error) {
        console.log(error);
    }
}
// we use this middleware in routes
export default auth;