import React,{useState} from 'react'
import { Grid,TextField ,Button,Collapse,Alert,IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import {Link,useNavigate} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,updateProfile,sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
const Registration = () => {
    let navigate = useNavigate();
    const auth = getAuth();
    const db = getDatabase();
    const [open, setOpen] = React.useState(false);
    let [name,setName] = useState('');
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [confirmPassword,setConfirmPassword] = useState('');
    let [nameError, setNameError] = useState('');
    let [passwordError, setPasswordError] = useState('');
    let [emailError,setEmailError] = useState('');
    let [confirmPassError,setConfirmPassError] = useState('');
    let [existsMailError,setExistsMailError] = useState('');

    let handleSubmit = ()=>{
        if(!email){
            setEmailError('Please enter your e-mail address')
            return
        }else{
            setEmailError('')
        }
        if(!name){
            setNameError('Please enter your full name')
            return
        }else{
            setNameError('')
        }
        if(!password){
            setPasswordError('Please set your password')
            return
        }else if(password.length < 8){
            setPasswordError('Password length must be greater than or equal to 8')
            return
        }else{
            setPasswordError('')
        }
        if(!confirmPassword){
            setConfirmPassError('Please re-enter your password');
        }else if(confirmPassword != password){
            
            setConfirmPassError('Password mismatch')
            return;
        }else{
          confirmPassError = '';
            setConfirmPassError('')
        }
       
        if(nameError === '' && passwordError === '' && emailError === '' && confirmPassError === ''){
            createUserWithEmailAndPassword(auth, email,password).then((user)=>{
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: name
                      }).then(() => {
                      console.log('name set')
                      set(ref(db, 'users/'+auth.currentUser.uid ), {
                        username: name,
                        email: email,
                        
                      });
                      }).catch((error) => {
                        console.log(error)
                      });
                });
               navigate('/login')
            }).catch((error)=>{
                const errorCode = error.code;
              if(errorCode.includes('email')){
                    setExistsMailError('Email already exists. Try another one')
                    setOpen(true)
                }
            })
        }
     
    }
  return (
    <section className='registration_part'>
        <Grid container spacing={2}>
                <Grid item xs={6}>
                   <div className="box">
                        <div className="left">
                            <h2>Get started with easily register</h2>
                            <p style={{marginBottom: "20px"}}>Free register and you can enjoy it</p>
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
                               {existsMailError}
                                </Alert>
                            </Collapse>
                            <TextField helperText={emailError}
                            id="demo-helper-text-misaligned1" label="Email Address"
                            onChange={(e)=>setEmail(e.target.value)} style={{width: '368px',marginTop: '20px'}} type="text"/><br/>
                              <TextField helperText={emailError?'':nameError}
                            id="demo-helper-text-misaligned2" label="Full name"
                            onChange={(e)=>setName(e.target.value)} style={{width: '368px',marginTop: '20px'}} type="email"/><br/>
                              <TextField helperText={nameError||emailError?'':passwordError} 
                            id="demo-helper-text-misaligned3" label="Password"
                            onChange={(e)=>setPassword(e.target.value)} style={{width: '368px',marginTop: '20px'}} type="password"/><br/>
                            <TextField helperText={passwordError||nameError||emailError?'':confirmPassError}
                            id="demo-helper-text-misaligned4" label="Confirm-Password"
                            onChange={(e)=>setConfirmPassword(e.target.value)} style={{width: '368px',marginTop: '20px'}} type="password"/><br/>
                            <Button onClick={handleSubmit} style={{background: '#5F35F5',width: '368px', padding: '10px 0',borderRadius: '86px', marginTop: '40px'}} variant="contained">Sign up</Button>
                            <p className='msg'>Already have an account ? <Link to="/login">Login</Link></p>
                        </div>
                   </div>
                </Grid>
                <Grid item xs={6}>
                    <img style={{width: '100%',height: '100vh'}} src="./assets/images/registration_bg.png"/>
                </Grid>
    
        </Grid>
    </section>
  )
}

export default Registration