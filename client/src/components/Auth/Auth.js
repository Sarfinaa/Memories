import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import dotenv from "dotenv";
import Icon from './icon';
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import {signin,signup} from '../../actions/auth';
//same should be same as name in input name attribute
const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};

function Auth() {
  dotenv.config();
  const classes = useStyles();
  const dispatch=useDispatch();
  const history=useHistory();
 const [formData,setFormData]=useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
//using history so that we can know something happened
dispatch(signup(formData,history));
    }else{
      dispatch(signin(formData,history));
    }
  };
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
    const googleSuccess=async (res)=>{
 //?. special operator-if res is not available
      const result=res?.profileObj;
      const token=res?.tokenId;
      try{
dispatch({type:'AUTH',data:{result,token}});
//after clicking on our account we want to go back to home page thats why we are using history.push()
history.push('/')
      }catch(error){
console.log(error);
      }

    }
    const googleFailure=()=>{
        console.log("google sign in was unsuccessful ")
    }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            className={classes.submit}
            variant="contained"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
 {/* All code for google buttom     */}
          <GoogleLogin
            clientId={ProcessingInstruction.env.GOOGLE_API}// google api 
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >Google Sign In</Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
