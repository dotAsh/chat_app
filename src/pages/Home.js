import React,{useState,useEffect} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Alert,Grid} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import Leftbar from '../components/Leftbar';
import Search from '../components/Search'
import Grouplist from '../components/Grouplist';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends'
import UserList from '../components/UserList'

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [emailverify,SetEmailVerify] = useState(false);
 useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
     SetEmailVerify(user.emailVerified);
    } else {
      navigate('/login')
    }
  });
 },[]);
  return (
    <>
      {
        emailverify
        ?
        <Grid container spacing={2}>
        <Grid item xs={2}>
          <Leftbar active="home"></Leftbar>
        </Grid>
        <Grid item xs={4}>
          <Search></Search>
          <Grouplist></Grouplist>
          <FriendRequest></FriendRequest>
        </Grid>
        <Grid item xs={3}>
         <Friends></Friends>
        </Grid>
        <Grid item xs={3}>
          <UserList></UserList>
        </Grid>
      </Grid>
        :
        <Grid container spacing={2}>
  
          <Grid item xs={4}>
            
          </Grid>
          <Grid item xs={4}>
              <Alert variant="outlined" severity="info">
                    <h1>plese check your email for verification</h1>
              </Alert>
          </Grid>
          <Grid item xs={8}>
            
          </Grid>
        </Grid>
        
      }
    </>
  )
}

export default Home