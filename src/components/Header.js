import React from 'react'
import { Link } from 'react-router-dom'
import Naranja from '../assets/images/naranja.gif'
function Header() {
  return (
    <header>
    <nav id="nav">
      <Link to="/"><img className='naranja' alt='naranja' src={Naranja}></img></Link>
        <section className="navLinks">
          <div>
       
          <Link to="/dashboard">levels</Link>
         
        </div>
        <div>
        <Link to ="/admin">admin page</Link>
        <Link to ="/login">login</Link>
        <Link to ="/signup">sign up</Link>
        </div>
        </section>
  
        
      </nav>
      </header>
    
 
  )
}

export default Header