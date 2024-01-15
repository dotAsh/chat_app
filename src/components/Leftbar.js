import React,{useEffect, useState} from 'react'
import {AiOutlineHome} from 'react-icons/ai';
import {MdSms } from 'react-icons/md';
import {IoMdNotificationsOutline} from 'react-icons/io'
import {FiSettings} from 'react-icons/fi'
import {IoLogOut} from 'react-icons/io5'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import {Modal,Box,Typography} from '@mui/material'
const Leftbar = (props) => {
    const auth = getAuth();
    let navigate = useNavigate();
    const [name,setName] = useState('')
    let [open,setOpen] = useState(false)
    let handleClose = ()=>{
        setOpen(false)
    }
    let handleSignOut = ()=>{
        signOut(auth).then(() => {
            console.log('signout')
            navigate('/login')
          }).catch((error) => {
            console.log(error)
          });
    }
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setName(user.displayName)
          } 
        });
       },[]);
       let handleModalOpen = ()=>{
        setOpen(true)
       }
  return (
    <div className='leftbar'>
        <img className="profilePic" src="assets/images/login_bg.png"/>
       <h4 onClick={handleModalOpen}>{name}</h4>
        <div className='icons'>
            <ul>
                <li className = {props.active == 'home' && 'active'}>
                    <AiOutlineHome className='icon'/>
                </li>
                <li className = {props.active == 'msg' && 'active'}>
                    <MdSms className='icon'/>
                </li>
                <li className = {props.active == 'notification' && 'active'}>
                    <IoMdNotificationsOutline className='icon'/>
                </li>
                <li className = {props.active == 'setting' && 'active'}>
                    <FiSettings className='icon'/>
                </li>
                <li onClick={handleSignOut}>
                    <IoLogOut className='icon last_icon'/>
                </li>
            </ul>
        </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="leftbar_modal">
                <Box className='leftbar_box'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
    </div>
  )
}

export default Leftbar