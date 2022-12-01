import React, { useState } from 'react'
import menu from '../assets/images/menu.svg'
import cross from '../assets/images/cross.svg'
import naranja from '../assets/images/naranja.gif'
function Header2() {
  const [activeMenu, setActiveMenu] = useState(false)
  return (
    <header>
            <div onClick={() => setActiveMenu(!activeMenu)} className='menu'>
            <img src={menu} alt='menu'></img>
            </div>
        <div className='logo'>
            <img src={naranja} alt='naranja'></img>
        </div>
       {activeMenu && <section className='burger'>
       <div onClick={() => setActiveMenu(!activeMenu)} className='menu'>
            <img src={cross} alt='cross'></img>
            </div>
       
        <section className="navLinks">
       
       <a href='/course'>courses</a>
        {/* <Link to ="/admin">admin page</Link>
        <Link to ="/login">login</Link>
        <Link to ="/signup">sign up</Link> */}
      
        </section>
  
        

        </section>} 
        </header>
  )
}

export default Header2