import React from 'react';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useServicios } from '../service/ServiciosContext';
import { useCategorias } from '../category/CategoryContext';
import { useUsuario } from '../user/UserContext';
import LoadingComponent from '../main/LoadingComponent';
import ModalContactForm from "../contactForm/ModalContactForm"
import { Paper } from "@mui/material";
import Comment from "../comment/Comment"
import swal from 'sweetalert';
import './style.scss';

const ServicePage = () => {
var {serviceID} = useParams();
const { getUserByID } = useUsuario();
const { obtenerCategoriasPorServicio } = useCategorias();
const { obtenerServicioPorID, guardarComentario, cargarImagen } = useServicios();
const [servicioCapturado, setServicioCapturado] = useState([]);
const [serviceLoaded, setServiceLoaded] = useState(false);
const [categoriasItem, setCategoriasItem] = useState([]);
const [categoriasLoaded, setCategoriasLoaded] = useState(false);
const [commentsItem, setCommentsItem] = useState([]);
const [image, setImage] = useState("");
const [responsible, setResponsible] = useState("");
const [responsibleLoaded, setResponsibleLoaded] = useState(false);
const [title, setTitle] = useState("");
const [experience, setExperience] = useState("");
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const idStlye = "boton"+serviceID;
const altImage = require("../../images/services/default.jpg");

useEffect(() => {
    if(!serviceLoaded){
      obtenerServicioPorID(serviceID).then((data)=> {
        setServicioCapturado(data);
        setServiceLoaded(true);
        setCommentsItem(data.comments.filter(comment => comment.reviewed === true))
        setImage(data.image)
        if(!responsibleLoaded){
          getUserByID(data.responsible).then((user)=> {
            setResponsible(user.name + " " + user.lastname);
            setExperience(user.experience);
            setTitle(user.title);
            setResponsibleLoaded(true);
          })
          .catch((err)=>console.log(err));
        }
        if(!categoriasLoaded){
          obtenerCategoriasPorServicio(data).then((categories)=> {
            setCategoriasItem(categories)
            setCategoriasLoaded(true);
          })
          .catch((err)=>console.log(err));
        }
    }).catch((err)=>{
      swal("Item no encontrado","El item no fue encontrado. "+err,"error")
    });
    }
}, [serviceID, obtenerCategoriasPorServicio, obtenerServicioPorID, serviceLoaded, responsibleLoaded, getUserByID, categoriasLoaded]);
  
  const handleNewComment = (newComment) => {
    guardarComentario(newComment, serviceID).then(() => {
        swal("Su comentario ha sido creado", "Debera ser revisado por el profesor antes de ser publicado", "success")
    })
  }

  const renderComments = () => {
    if(commentsItem.length === 0) {
      return <h1>No hay comentarios para este servicio</h1>
    }
    return <div>
    <h1>Otros alumnos opinan</h1>
      {
        commentsItem.map((comment, index) => {
          return (
            <div key={index}>
              <Comment comment={comment} editMode={false} onSave={null}></Comment>
            </div>
          )
        })
      }
    </div>
  }
  const setAltImage = (e) => {
    e.preventDefault();
    setImage(altImage);
  }

  if(!serviceLoaded || !responsibleLoaded || !categoriasLoaded){ 
    return(<LoadingComponent />)} 
  else return(
    <main>
      <div className="container">
        <div className="item">
          <div className="imageDetailContainer">
            <div style={{flexDirection: "column"}}>
              <img src={image} alt="" style={{marginTop: "20%"}} onError={(e) => {setAltImage(e)}}/>
            </div>
          </div>
          <div className="containerTextsButtonDetail">
              <div className="textContainer">
                  <div className="detailPageArea">
                    <div id="detailPageColumn">
                      <h4 className="nameElement">{servicioCapturado.name}</h4>
                      <p className="descriptionElement">{servicioCapturado.description}</p>
                      <h4 className="nameElement">Sobre tu curso</h4>
                      <p className="descriptionElement">Duracion : {servicioCapturado.duration}</p>
                      <p className="descriptionElement">Frecuencia : {servicioCapturado.frequency}</p>
                      <p className="descriptionElement">Tipo de curso : {servicioCapturado.type}</p>
                      <h4 className="nameElement">Sobre tu profe</h4>
                      <p className="descriptionElement">Titulo : {title}</p>
                      <p className="descriptionElement">{experience}</p>
                    </div>
                    <div id="variedInfo">
                      <h5 className="priceElement">Responsable: {responsible}</h5>
                      <h5 className="priceElement">${servicioCapturado.price}</h5>
                      <div className="buttonElementContainer">
                        <button type="button" onClick={handleShow} className="btn btn-outline-dark botonAgregarCarrito" id={idStlye}>Contactar</button>
                      </div>
                      <ModalContactForm costoTotal={ servicioCapturado.cost } show={show} onHide={handleClose} serviceID={serviceID}/>
                      <h5 className="priceElement">Categorías</h5>
                      <div className="categories">
                        {categoriasItem.map((categoria) => (
                        <p className="descriptionElement" key={categoria.id}>{categoria.name}</p>
                          ))
                          }
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="container">
        <Paper style={{ padding: "40px 20px" }}>
          {renderComments()}
          <h2>¿Queres dejar tu comentario?</h2>
          <Comment editMode={true} onSave={handleNewComment}></Comment>
        </Paper>
      </div>
      <hr />
    </main>
  )
}

export default ServicePage