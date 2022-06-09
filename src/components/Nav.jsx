import React, { useEffect, useState } from 'react'
import '../style/Nav.css'
const Nav = () => {
  const [show, setShow] = useState(false)
  useEffect(()=>{
    window.addEventListener("scroll", ()=> {
      if(window.scrollY > 90){
        setShow(true)
      }else{
        setShow(false)
      }
      return () =>{
        window.removeEventListener("scroll")
      }
    })
   
  })
  return (
    <nav className={`nav_container ${show && "showBackground"}`}>
      <div className='nav_features'>
      <img className='nav_logo' src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt='netflix-logo' />
        <span className='nav_featureOption'>Films</span>
        <span className='nav_featureOption'>Series</span>
      </div>
      <img className='nav_avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVWGKNk39rCbUMmHEV3uqusN3WZ4LjYZbhrZfNGJ-85ilFgp095yz1AC5Rg7XRsLXE1eQ&usqp=CAU' alt='avatar' />
    </nav>
  )
}

export default Nav