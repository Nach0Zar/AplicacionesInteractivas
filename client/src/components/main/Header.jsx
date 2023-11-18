import React from 'react'
import NavBar from './NavBar'
import './style.scss';

const Header = () => {
  return (
    <header>
      <NavBar/>
        <div id="headerTitle">
          <h1>Cursera</h1>
          <h2>Cursos de todo tipo, encontra el que va con vos!</h2>
        </div>
        <hr/>
    </header>
  )
}

export default Header