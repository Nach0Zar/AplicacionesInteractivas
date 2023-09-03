import React from 'react'
import NavBar from './NavBar'
import './style.scss';

const Header = () => {
  return (
    <header>
      <NavBar/>
        <div id="headerTitle">
          <h1>Zona Compra E-Commerce</h1>
          <h2>E-Commerce dedicado a sudamerica</h2>
        </div>
        <hr/>
    </header>
  )
}

export default Header