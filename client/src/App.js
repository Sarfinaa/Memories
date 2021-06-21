import React from 'react';
import {Container} from '@material-ui/core';
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails'
function App() {
    const user=JSON.parse(localStorage.getItem('profile'));
    return (
        <Router>
            <Container maxWidth="xl">
       <NavBar/>
       <Switch>
           <Route path='/' exact component={()=><Redirect to="/posts"/>}/>
           <Route path='/posts' exact component={Home}/> 
           {/* //render when we are searching something */}
           <Route path='/posts/search' exact component={Home}/>
           <Route path='/posts/:id' component={PostDetails}/>
           {/* // if user is logged in it does not show auth page */}
           <Route path='/auth' exact component={ ()=>(!user?<Auth/>:<Redirect to="/posts"/>)}/>
       </Switch>
        </Container>
        </Router>
        
    )
}

export default App
