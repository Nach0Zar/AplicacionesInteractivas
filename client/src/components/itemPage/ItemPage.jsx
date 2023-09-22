import React from 'react';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { useArticulos } from '../listing/ItemsContext';
import { useCategorias } from '../category/CategoryContext';
import { useUsuario } from '../user/UserContext';
import { getClase } from "../../api/service/classesService.ts";
import { Divider, Avatar, Grid, Paper } from "@mui/material";

import swal from 'sweetalert';
import Comment from "../comment/Comment"
import './style.scss';

const ItemPage = () => {
var {itemId} = useParams();
const { usuario } = useUsuario();
const { obtenerCategoriasPorArticulo } = useCategorias();
const { obtenerItemPorID } = useArticulos();
const { isInCart, addItem, removeItem} = useCart();
const [articuloCapturado, setArticuloCapturado] = useState([]);
const [comentarios, setComentarios] = useState([])
const [categoriasItem, setCategoriasItem] = useState([]);
const [texto, setTexto] = useState("");
useEffect(() => {
  console.log("entre")
  const getItemByID = new Promise((resolve) => {
    resolve(getClase("a"));
  })

  getItemByID.then((data) => {
    console.log(data)
    setArticuloCapturado(data)
    setCategoriasItem(data.category)
    setComentarios(data.comments)
  })

/*   getItemByID.then((data)=> {
    setArticuloCapturado(data);
    if(!isInCart(data.id)){
      setTexto("Agregar Articulo");
      setEstilo("btn btn-outline-dark botonAgregarCarrito");
    }
    else {
      setTexto("Articulo Añadido");
      setEstilo("btn btn-dark botonAgregarCarrito");
    }
    
    const getCategoryByID = new Promise((resolve) => {
      resolve(obtenerCategoriasPorArticulo(data));
    });
    getCategoryByID.then((data)=> {setCategoriasItem(data)})
    
    .catch((err)=>console.log(err));
      
  }).catch((err)=>{
    swal("Item no encontrado","El item no fue encontrado. "+err,"error")
    }); */
  
  }, [itemId, isInCart, obtenerCategoriasPorArticulo, obtenerItemPorID]);
  
useEffect(() => {
  const actualizarBoton = () => {
    if(!isInCart(articuloCapturado.id)){
      setTexto("Agregar Articulo");
    }
    else {
      setTexto("Articulo Añadido");
    }
  }
  actualizarBoton();
},[texto, articuloCapturado, addItem, removeItem, isInCart])
  

const cambiarEstadoArticuloEnCarrito = (event) => {

}


  return (
    <main>
      <div className="container">
        <div className="item">
          <div className="imageDetailContainer">
              <img src={articuloCapturado.imgSrc} alt=""/>
          </div>
          <div className="containerTextsButtonDetail">
              <div className="textContainer">
                  <div className="detailPageArea">
                    <div id="detailPageColumn">
                      <h4 className="nameElement">{articuloCapturado.nombreArticulo}</h4>
                      <p className="descriptionElement">{articuloCapturado.description}</p>
                    </div>
                    <div id="variedInfo">
                      <h5 className="priceElement">${articuloCapturado.cost}</h5>
                      <h5 className="priceElement">Categorías</h5>
                      <div className="categories">
                        {categoriasItem.map((categoria) => (
                        <p className="descriptionElement" key={categoria}>{categoria}</p>
                          ))
                          }
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <Paper style={{ padding: "40px 20px" }}>
        <h1>¿Te interesa?</h1>
        <h3>Contacta al profe completando el siguiente formulario</h3>
        </Paper>
        {
          <Paper style={{ padding: "40px 20px" }}>
            <h1>Otros alumnos opinan</h1>
              {
                comentarios.map((comment, index) => {
                  return (
                    <div key={index}>
                      <Comment comment={comment}></Comment>
                    </div>
                  )
                })
              }
          </Paper>
        }
      </div>
      <hr />
    </main>
  )
}

export default ItemPage