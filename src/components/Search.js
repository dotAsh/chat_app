import React from 'react'
import {BsSearch,BsThreeDotsVertical} from 'react-icons/bs'
const Search = () => {
  return (
    <div className='Search'>
       <BsSearch className='search_icon1'/>
        <input placeholder='Search'/>
        <BsThreeDotsVertical className='search_icon2'/>
    </div>
  )
}

export default Search