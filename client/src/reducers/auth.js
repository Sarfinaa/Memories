import {AUTH,LOGOUT} from '../constants/actionTypes';
const authReducer=(state={authData:null},action)=>{
    switch(action.type){
        case AUTH:
            //refresh and we are also logged in and setting data to local storage and using this data in nav bar
            localStorage.setItem('profile',JSON.stringify({...action?.data}));

            return {...state,authData:action?.data};
        case LOGOUT:
            //clearing local storage so that after logout user get fully deleted 
            localStorage.clear();
            return {...state,authData:action?.data};
            default:
                return state;
    }
};
export default authReducer;