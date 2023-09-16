import React from 'react';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { useServicios } from '../service/ServiciosContext';
import { useCategorias } from '../category/CategoryContext';
import { useUsuario } from '../user/UserContext';
import swal from 'sweetalert';
import './style.scss';

const ServicePage = () => {
var {serviceID} = useParams();
const { usuario } = useUsuario();
const { obtenerCategoriasPorServicio } = useCategorias();
const { obtenerServicioPorID } = useServicios();
const { isInCart, addItem, removeItem} = useCart();
const [servicioCapturado, setServicioCapturado] = useState([]);
const [categoriasItem, setCategoriasItem] = useState([]);
const [image, setImage] = useState("");
const [texto, setTexto] = useState("");
const [estilo, setEstilo] = useState("");
const idStlye = "boton"+serviceID;
useEffect(() => {
  let getItemByID = new Promise((resolve) => {
    resolve(obtenerServicioPorID(serviceID));
  })
  
  getItemByID.then((data)=> {
    setServicioCapturado(data);
    const logo = require("../../images/services/"+data.image)
    setImage(logo);
    if(!isInCart(data.id)){
      setTexto("Agregar Servicio");
      setEstilo("btn btn-outline-dark botonAgregarCarrito");
    }
    else {
      setTexto("Servicio Añadido");
      setEstilo("btn btn-dark botonAgregarCarrito");
    }
    
    const getCategoryByID = new Promise((resolve) => {
      resolve(obtenerCategoriasPorServicio(data));
    });
    getCategoryByID.then((data)=> {setCategoriasItem(data)})
    
    .catch((err)=>console.log(err));
      
  }).catch((err)=>{
    console.log(err)
    swal("Item no encontrado","El item no fue encontrado. "+err,"error")
  });
}, [serviceID, isInCart, obtenerCategoriasPorServicio, obtenerServicioPorID]);
  
useEffect(() => {
  const actualizarBoton = () => {
    if(!isInCart(servicioCapturado.id)){
      setTexto("Agregar Servicio");
      setEstilo("btn btn-outline-dark botonAgregarCarrito");
    }
    else {
      setTexto("Servicio Añadido");
      setEstilo("btn btn-dark botonAgregarCarrito");
    }
  }
  actualizarBoton();
},[texto, servicioCapturado, addItem, removeItem, isInCart, image])
  
const cambiarEstadoServicioEnCarrito = (event) => {
  event.preventDefault();
  if(!isInCart(servicioCapturado.id)){
    setTexto("Agregar Servicio");
    setEstilo("btn btn-outline-dark botonAgregarCarrito");
    if(!(usuario === null)){
      addItem(servicioCapturado.id,1);
    }
    else{
      swal("Usuario no logueado", "Debes estar logueado para poder agregar servicios a tu carrito!", "warning");
    }
  }
  else {
    setTexto("Servicio Añadido");
    setEstilo("btn btn-dark botonAgregarCarrito");
    removeItem(servicioCapturado.id);
  }
}


  return (
    <main>
      <div className="container">
        <div className="item">
          <div className="imageDetailContainer">
              <img src={image} alt=""/>
          </div>
          <div className="containerTextsButtonDetail">
              <div className="textContainer">
                  <div className="detailPageArea">
                    <div id="detailPageColumn">
                      <h4 className="nameElement">{servicioCapturado.name}</h4>
                      <p className="descriptionElement">{servicioCapturado.description}</p>
                    </div>
                    <div id="variedInfo">
                      <h5 className="priceElement">${servicioCapturado.price}</h5>
                      <div className="buttonElementContainer">
                        <button type="button" onClick={cambiarEstadoServicioEnCarrito} className={estilo} id={idStlye}>{texto}</button>
                      </div>
                      <h5 className="priceElement">Categorías</h5>
                      <div className="categories">
                        {categoriasItem.map((categoria) => (
                        <p className="descriptionElement" key={categoria.idCategoria}>{categoria.nombreCategoria}</p>
                          ))
                          }
                      </div>
                    </div>
                  </div>
              </div>
              
          </div>
        </div>
      </div>
      <hr />
    </main>
  )
}

export default ServicePage