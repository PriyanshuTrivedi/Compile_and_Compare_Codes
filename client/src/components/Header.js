import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {

  const Compile=()=>{
    const navLink1Style=document.getElementById('navLink1').style;
    const navLink2Style=document.getElementById('navLink2').style;
    navLink1Style.backgroundColor='white';
    navLink1Style.color='black';
    navLink1Style.borderRadius='20px';
    navLink2Style.backgroundColor='black';
    navLink2Style.color='white';
  }
  const Compare=()=>{
    const navLink1Style=document.getElementById('navLink1').style;
    const navLink2Style=document.getElementById('navLink2').style;
    navLink2Style.backgroundColor='white';
    navLink2Style.color='black';
    navLink2Style.borderRadius='20px';
    navLink1Style.backgroundColor='black';
    navLink1Style.color='white';
  }
  return (
    <div className='headr'>
      <NavLink id='navLink1' style={{color:'white',paddingLeft:'10px',paddingRight:'10px',paddingTop:'5px',paddingBottom:'5px',backgroundColor:'white',color:'black',borderRadius:'20px'}} to="/" onClick={Compile}>Custom Compilation</NavLink>
      <NavLink id='navLink2' style={{color:'white',paddingLeft:'10px',paddingRight:'10px',paddingTop:'5px',paddingBottom:'5px'}} to="/compare" onClick={Compare}>Compare two Codes</NavLink>
    </div>
  )
}

export default Header
