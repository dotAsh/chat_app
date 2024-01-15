import { getDatabase, ref, onValue} from "firebase/database";
import React, { useEffect,useState } from 'react'
import { getAuth} from "firebase/auth";
import {Alert} from '@mui/material'
const FriendRequest = () => {
    const db = getDatabase();
    const auth = getAuth();
    let [friendReqListArr,setFriendReqListArr] = useState([])
    useEffect(()=>{
        let friendReqArr = []
        const friendRequestRef = ref(db, 'friendrequest/' );
        onValue(friendRequestRef, (snapshot) => {
        const data = snapshot.val();
        snapshot.forEach((item)=>{
            if(auth.currentUser.uid == item.val().receiverId){
                friendReqArr.push({
                    name: item.val().name,
                    receiverId: item.val().receiverId,
                    senderId: item.val().senderId
    
                });
            }
           
           
        })
        setFriendReqListArr(friendReqArr)
});
    },[])
  return (
    <div className='groupList'>
    <h2>Friend  Request</h2>
    {
        friendReqListArr.length?
            friendReqListArr.map(item=>(
                <div className='box'>
                <div className='img'>
                    <img src='assets/images/friend_request_img1.png'/>
                </div>
                <div className='name'>
                    <h1>{item.name}</h1>
                    <h4>Hi Guys, Wassup!</h4>
                </div>
                <div className='btn'>
                    <button>Accept</button>
                </div>
            </div>
            ))
            :
            <Alert severity="error">This is an error alert — check it out!</Alert>
        }
    
   
</div>
  )
}

export default FriendRequest
