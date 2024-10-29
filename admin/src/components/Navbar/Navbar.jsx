import React from 'react'
import './Navbar.css';
import navlogo from '../../assets/v2_logo_white.png';
import navProfile from '../../assets/nav-profile.svg'
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navlogo-container'>
        <img src={navlogo} alt="" className='nav-logo' />
        <h2>V2 Shopper</h2>
      </div>
      <CgProfile className='logo' />
    </div>
  )
}

export default Navbar
