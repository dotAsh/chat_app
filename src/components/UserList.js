import React, { useEffect,useState } from 'react'
import { getDatabase, ref,set, onValue,push} from "firebase/database";
import { getAuth} from "firebase/auth";
import {AiOutlineCheck} from 'react-icons/ai'
const UserList = () => {
   
    const auth = getAuth();
    const db = getDatabase();
    let [userlist,setUserlist] = useState([]);
    let [friendReqListArr,setFriendReqListArr] = useState([])
    let [friendReqListArr2,setFriendReqListArr2] = useState([])
    let [change,setChange] = useState(false);
   useEffect(() => {
   let userArr = []
    const userRef = ref(db, 'users/' );
    onValue(userRef, (snapshot) => {
        snapshot.forEach((item)=>{
            userArr.push({
                username: item.val().username,
                email: item.val().email,
                id: item.key

            });
           
        })
        setUserlist(userArr)
      });
      
   }, [])
   useEffect(()=>{
        let friendReqArr = []
       
        const friendRequestRef = ref(db, 'friendrequest/' );
        onValue(friendRequestRef, (snapshot) => {
        const data = snapshot.val();
        snapshot.forEach((item)=>{
                friendReqArr.push(item.val().receiverId+item.val().senderId);
                
               
        })
        setFriendReqListArr(friendReqArr)
       
        });
    },[change])
   let handleFriendRequest = (info)=>{
    set(push(ref(db, 'friendrequest/' )), {
        name: auth.currentUser.displayName,
        receiverId: info.id,
        senderId: auth.currentUser.uid
      });
      setChange(!change);
   }
  return (

    <div className='groupList friend_list user_list'>
    <h2>User List</h2>
   
    {
        userlist.map(item=>(
            auth.currentUser.uid !== item.id && 
            <div className='box'>
                <div className='img'>
                    <img src='assets/images/group_img1.png'/>
                </div>
                <div className='name'>
                    <h1>{item.username}</h1>
                    <h4>{item.email}</h4>
                </div>
                {
                   ( friendReqListArr.includes(item.id+auth.currentUser.uid)
                    ||friendReqListArr.includes(auth.currentUser.uid+item.id)) ?
                    <div className='btn'>
                        <button>  <AiOutlineCheck></AiOutlineCheck></button>
                     </div>
                    :
                    <div className='btn'>
                    <button onClick={()=>handleFriendRequest(item)}>+</button>
                    </div>
                }
                
            </div>
        ))
    }
    
   
</div>
  )
}

export default UserList
