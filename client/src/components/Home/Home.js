import React,{useState,useEffect} from 'react'
import {Container,Paper,Grow,Grid,AppBar,TextField,Button} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
//location- to see at which page we are,history-to navigate to pages
import {useHistory,useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import {useDispatch} from 'react-redux';
import {getPosts,getPostsBySearch} from '../../actions/posts';
import useStyles from './styles';
import Pagination from '../Pagination';
//setting urlsearchparams so that we know on which page we are on and which search term we are looking for.
function useQuery(){
    return new URLSearchParams(useLocation().search);
}
function Home() {
    const [currentId,setCurrentId]=useState(null);
const classes=useStyles();
    const dispatch = useDispatch();
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);
    //getting info from page
    const query=useQuery();
    const history=useHistory();
    //read url and see if there is page keyword or not
    const page=query.get('page')||1;
    const searchQuery=query.get('searchQuery');
  

const handleKeyPress=(e)=>{
    //13-Enter Key
    if(e.keyCode===13){
//search post
searchPost();
    }
};
const searchPost=()=>{
    //removing spaces from search 
    if(search.trim()||tags){
        //fetch search post
        dispatch(getPostsBySearch({search,tags:tags.join(',')}))
    //so that we go to specific post
        history.push(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`);
    }else{
        history.push('/');
    }
}
const handleAdd=(tag)=>setTags([...tags,tag]);
const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete));
    return (
        <Grow in>
        <Container maxWidth="xl">
            <Grid container className={classes.gridContainer} justify="space-between"  alignItems="stretch" spacing={3}>
           <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId}/>
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
               <AppBar className={classes.appBarSearch} position="static" color="inherit">
                   <TextField name="search" variant="outlined" label="Search Memories" 
                   onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e)=> setSearch(e.target.value)}/>
               <ChipInput 
               style={{margin:'10px 0'}}
               value={tags}
               onAdd={handleAdd}
               onDelete={handleDelete}
               label="Search Tags"
               variant="outlined"
               />
               <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">
                   Search
               </Button>
               </AppBar>
               <Form currentId={currentId}  setCurrentId={setCurrentId}/>
               {(!searchQuery&&!tags.length)&&(
                <Paper  elevation={6} className={classes.pagination}>
                   <Pagination page={page}/>
               </Paper>
               )}
               
               </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home
