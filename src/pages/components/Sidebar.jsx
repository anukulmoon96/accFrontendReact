import React from 'react'
import {FaHome,FaUserFriends} from 'react-icons/fa'
function SideMenu(){
  return(
    <>
      <div className='container'>
        <ul className="sidebar">
            <li><span>SM</span></li>
            <li><span><FaHome/></span></li>
            <li><span><FaUserFriends/></span></li>
        </ul>
        <div className='content'>
            test
        </div>
      </div>
    </>
  )
}

export default SideMenu;