import React from 'react'
import { NavLink } from 'react-router-dom';
import Carrito from './CartWidget';
import { useCart } from '../cart/CartContext';
import { useUsuario } from '../user/UserContext';

const NavBar = () => {
  const { articulos } = useCart();
  const { usuario, desloguearUser} = useUsuario();
  const isLoggedIn = !(usuario === null);
  
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/"}>Zona Compra</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse bg-dark" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item navLink"><NavLink className="nav-link text-white" to={"/category"}>Mercado</NavLink></li>
            <li className="nav-item navLink"><NavLink className="nav-link text-white" to={"/faqs"}>FAQs</NavLink></li>
            {!isLoggedIn && (
            <li className="nav-item navLink"><NavLink className="nav-link text-white" to={"/login"}>Loguearse</NavLink></li>
            )}
            {!isLoggedIn && (
            <li className="nav-item navLink"><NavLink className="nav-link text-white" to={"/register"}>Registrarse</NavLink></li>
            )}
            {isLoggedIn && (
            <li className="nav-item navLink"><NavLink className="nav-link text-white" to={"/"} onClick={(e)=>{desloguearUser()}}>Desloguearse</NavLink></li>
            )}
            {isLoggedIn && (
            <li className="nav-item navLink"><NavLink className="nav-link text-white" to={"/user"}>Usuario</NavLink></li>
            )}
            {isLoggedIn && (
            <li className="nav-item navLink"><NavLink className="nav-link text-white" to={"/orders"}>Ordenes</NavLink></li>
            )}
            <li className="nav-item navLink"><NavLink className="nav-link text-white" to={"/about"}>Acerca de nosotros</NavLink></li>
          </ul>
        </div>

        {articulos.length > 0 && 
          <Carrito/>}
      </div>
    </nav>
  )
}

export default NavBar