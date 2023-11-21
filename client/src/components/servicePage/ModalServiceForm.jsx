import React from 'react';
import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useUsuario } from '../user/UserContext';
import { useNavigate } from 'react-router-dom';
import { useServicios } from '../service/ServiciosContext';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import swal from 'sweetalert';
import { useCategorias } from '../category/CategoryContext';

const ModalServiceForm = (props) => {
    let navigate = useNavigate();
    const {guardarImagen, cargarImagen} = useServicios();
    const show = props.show;
    const handleClose = props.onHide;
    const [usuarioDatos, setUsuarioDatos] = useState('');
    const { usuario } = useUsuario();
    const { categoriasListadoDB } = useCategorias();
    const [service, setService] = useState(props.service)
    const [edicion, setEdicion] = useState(props.edicion)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [frequency, setFrequency] = useState("")
    const [type, setType] = useState("")
    const [categories, setCategories] = useState(categoriasListadoDB)
    const [price, setPrice] = useState("")
    const [published, setPublished] = useState(false)
    const [duration, setDuration] = useState()
    const [image, setImage] = useState(null)
    const [currentImage, setCurrentImage] = useState(null)
    const altImage = require("../../images/services/default.jpg");
    
    const isBlank = (input) => {
        return input.length === 0
    }
    
    const handleFileInputChange = e => {
        let allowedExtensions = ['gif', 'png', 'jpg', 'jpeg'];
        let file = e.target.files[0];
        let extension = file.name.split('.').pop();
        if(!allowedExtensions.includes(extension.toLowerCase())){
            swal("Formato de la imagen no valido","", "error");
            return
        }
        guardarImagen(file).then(data => {
            if(data != null){
                setImage(data)
                fetchImage(data)
            }
            else {
                swal("Error de subida de imagen, por favor intente mas tarde","", "error");
            }
        })
    };

    const handleRemoveImage = (e) => {
        setImage("")
        setCurrentImage("")
    }

    const fetchImage = (path) => {
        cargarImagen(path).then(file => {
            setCurrentImage(file)
        })
    }

    const setAltImage = (e) => {
    e.preventDefault();
    setCurrentImage(altImage);
    }

    useEffect(() => {
        console.log(props.service)
        setService(props.service)
        setEdicion(props.edicion)
        setName(props.service.name !== null ? props.service.name : "")
        setDescription(props.service.description !== null ? props.service.description : "")
        setFrequency(props.service.frequency !== null ? props.service.frequency : "")
        setType(props.service.type !== null ? props.service.type : "")
        setCategories(props.service.categories !== undefined ? props.service.categories : categoriasListadoDB)
        setPrice(props.service.price !== null ? props.service.price : "")
        setPublished(props.service.published !== null ? props.service.published : false)
        setDuration(props.service.duration !== null ? props.service.duration : "")
        setImage(props.service.image !== null ? props.service.image : null)
        fetchImage(props.service.image)
    }, [props.service, props.edicion, props.onSave, categoriasListadoDB])
    const realizarAccion = (e) => {
        e.preventDefault()
        const { name, description, frequency, type, categories, price, published, duration} = e.target.elements
        console.log(e)
        const selectedCategories = Array.from(categories.selectedOptions).map(category => category.value)
        if(isBlank(name.value) || isBlank(description.value) || isBlank(frequency.value) || isBlank(duration.value) || isBlank(price.value)){
            swal("Error de validacion, revise los campos","", "error");
        }
        else {
            let conFom = {
                name: name.value,
                description: description.value,
                frequency: frequency.value,
                type: type.value,
                categories: selectedCategories,
                price: price.value,
                published: published.checked,
                id: props.service.id,
                duration: duration.value,
                image: image
            }
            console.log(conFom)
            props.onSave(conFom)
            swal("Operacion exitosa!","", "success");
            handleClose()
        }
    }
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{edicion ? "Edita tu servicio" : "Crea tu servicio"}</Modal.Title>
        </Modal.Header>
        <form className="form-horizontal" onSubmit={realizarAccion}>
            <Modal.Body>
            <div className="centered">
                <p>Te pedimos que verifiques que la informacion es la correcta antes de confirmar</p>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Nombre</span>
                            </div>
                        <input type="text" className="form-control" placeholder="Nombre de tu servicio" name="name" defaultValue={name}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Descripcion</span>
                            </div>
                        <input type="text" className="form-control" placeholder="Descripcion de tu servicio" name="description" defaultValue={description}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Duracion</span>
                            </div>
                        <input type="number" className="form-control" placeholder="Duracion de tu servicio" name="duration" defaultValue={duration}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Frecuencia</span>
                            </div>
                        <select className="form-control" defaultValue={frequency} name='frequency'>
                            <option value="Unica">Unica</option>
                            <option value="Semanal">Semanal</option>
                            <option value="Mensual">Mensual</option>
                        </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Tipo</span>
                            </div>
                        <select className="form-control" defaultValue={type} name='type'>
                            <option value="Individual">Individual</option>
                            <option value="Grupal">Grupal</option>
                        </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Categorias</span>
                            </div>
                            <select className="form-control" defaultValue={categories} name='categories' multiple={true}>
                            {
                            categoriasListadoDB.map((category)=>
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                            }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Precio</span>
                            </div>
                        <input type="number" className="form-control" placeholder="Precio de tu servicio" name="price" defaultValue={price}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Marcar como Publicado</span>
                            </div>
                        <input type="checkbox" defaultChecked={published} name='published' style={{marginLeft: "2%"}}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Imagen de publicacion</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group" style={{borderWidth: "2px", borderColor: "black"}}>
                        <img src={currentImage} alt="" style={{width: "100%", height:"100%"}} onError={(e) => {setAltImage(e)}}/>
                    </div>
                    <div className="form-group" style={{marginTop: "2%"}}>
                        <div className="input-group mb-1">
                            <Button variant="contained" component="label" color="primary" style={{marginLeft: "2%"}}>
                                {" "}
                                <AddIcon /> Subir imagen
                                <input type="file" hidden name='photo' onChange={handleFileInputChange}/>
                            </Button>
                            <Button variant="contained" component="label" color="error" style={{marginLeft: "2%"}} onClick={handleRemoveImage}>
                                {" "}
                                <RemoveIcon /> Borrar foto
                            </Button>
                        </div>
                    </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
                <button type="submit" className="btn btn-outline-secondary" name="comprar">{edicion ? "Editar" : "Crear"}</button>
            </Modal.Footer>
            </form>
        </Modal>
    </>
  )
}

export default ModalServiceForm