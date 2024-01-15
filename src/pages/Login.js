import React,{useState} from 'react'
import { Grid,TextField ,Button,Collapse,Alert,IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import {Link,useNavigate} from 'react-router-dom'
import { AiFillEye,AiFillEyeInvisible} from 'react-icons/ai';
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider,FacebookAuthProvider  } from "firebase/auth";

function Login() {
  let navigate = useNavigate();
  const auth = getAuth();
  const [open, setOpen] = React.useState(false);
  let [email,setEmail] = useState('');
  let [password,setPassword] = useState('');
 
  let [passwordError, setPasswordError] = useState('');
  let [emailError,setEmailError] = useState('');
  let [checkPass,setCheckPass] = useState(false);
  let [wrongEmail,setWrongEmail] = useState('');
  let [wrongPassword,setWrongPassword] = useState('');
  let handleSubmit = ()=>{
      if(!email){
          setEmailError('Please enter your e-mail address')
          return
      }else{
          setEmailError('')
      }
     
      if(!password){
          setPasswordError('Please enter your password')
          return
      }else{
        passwordError = ''
          setPasswordError('')
      }
     
      
      if(passwordError === '' && emailError === ''){
       
        signInWithEmailAndPassword(auth, email,password).then((user)=>{
          
           navigate('/home')
        }).catch((error)=>{
          
            const errorCode = error.code;
            console.log(errorCode)
            if(errorCode.includes('email')){
                
                  setWrongEmail('Email not found')
                  setOpen(true)
                  setWrongPassword('')
            }else if(errorCode.includes('password')){
              setWrongPassword('wrong password')
              setOpen(true)
              setWrongEmail('')
            }
          
        })
        
    }
   
  }
  let handleEye = ()=>{
    setCheckPass(!checkPass);
  }
   let handleGoogleSignIn = ()=>{
   
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)

  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    navigate('/home')
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
   }
   let handleFbSignIn = ()=>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    
    navigate('/home')
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
   }
  return (
    <section className='login_part'>
        <Grid container spacing={2}>
                <Grid item xs={6}>
                   <div className="box">
                        <div className="left">
                            <h2>Login to your account!</h2>
                          
                            <div className="login_option">
                              <div onClick={handleGoogleSignIn} className='option'>
                                <img  src="./assets/images/google_logo.png"/>Login with Google</div>
                              <div onClick={handleFbSignIn} className='option'>
                                <img src="./assets/images/facebook_logo.png"/>Login with  Facebook</div>
                            </div>
                            <Collapse in={open}>
                                <Alert
                                variant="outlined" severity="error"
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                    
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                                >
                               {wrongEmail?
                               wrongEmail:
                               wrongPassword && wrongPassword}
                                </Alert>
                            </Collapse>
                            <TextField helperText={emailError}
                            id="demo-helper-text-misaligned5" label="Email Address"
                            onChange={(e)=>setEmail(e.target.value)} style={{width: '368px',marginTop: '20px'}} type="text"/><br/>
                             <div className='eye'>
                                  <TextField helperText={emailError?"":passwordError} 
                                  id="demo-helper-text-misaligned6" label="Password"
                                  onChange={(e)=>setPassword(e.target.value)} style={{width: '368px',marginTop: '20px'}} type={checkPass?'text':'password'}/>
                                  {
                                    checkPass?
                                    <AiFillEye onClick={handleEye}className='eyeIcon'/>:
                                    <AiFillEyeInvisible onClick={handleEye}className='eyeIcon'/>
                                  }
                                  
                             </div><br/>
                             
                            
                            <Button onClick={handleSubmit} style={{background: '#5F35F5',width: '368px', padding: '22px 0',borderRadius: '9px'}} variant="contained">Login to Continue</Button>
                            <p className='msg'>Don’t have an account ? <Link to="/">Sign up</Link></p>
                        </div>
                   </div>
                </Grid>
                <Grid item xs={6}>
                    <img style={{width: '100%',height: '100vh'}} src="./assets/images/login_bg.png"/>
                </Grid>
    
        </Grid>
    </section>
  )
}

export default Login
