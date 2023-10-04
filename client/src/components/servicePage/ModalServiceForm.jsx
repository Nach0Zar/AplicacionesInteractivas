import React from 'react';
import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useUsuario } from '../user/UserContext';
import { Usuario } from '../imports/classes';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const ModalServiceForm = (props) => {
    let navigate = useNavigate();
    const show = props.show;
    const handleClose = props.onHide;
    const [usuarioDatos, setUsuarioDatos] = useState('');
    const { usuario } = useUsuario();
    const [service, setService] = useState(props.service)
    const [edicion, setEdicion] = useState(props.edicion)
    const [name, setName] = useState(props.service.name !== null ? props.service.name : "")
    const [description, setDescription] = useState(props.service.description !== null ? props.service.description : "")
    const [frequency, setFrequency] = useState(props.service.frequency !== null ? props.service.frequency : "")
    const [qualification, setQualification] = useState(props.service.qualification !== null ? props.service.qualification : "")
    const [type, setType] = useState(props.service.type !== null ? props.service.type : "")
    const [categories, setCategories] = useState(props.service.categories !== null ? props.service.categories : [])
    const [price, setPrice] = useState(props.service.price !== null ? props.service.price : "")
    
    useEffect(() => {
        setService(props.service)
        setEdicion(props.edicion)
    }, [props.service])
    const realizarComentario = (e) => {
        e.preventDefault()
        const { email, dni, telefono } = e.target.elements
        let conFom = {
          email: email.value,
          dni: dni.value,
          telefono: telefono.value,
        }
        console.log(conFom)
        swal("Operacion Exitosa")
        handleClose()
    }

    const onShow = () => {

    }
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{edicion ? "Edita tu servicio" : "Crea tu servicio"}</Modal.Title>
        </Modal.Header>
        <form className="form-horizontal" onSubmit={realizarComentario}>
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
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Frecuencia</span>
                            </div>
                        <input type="text" className="form-control" placeholder="99999999" name="frequency" defaultValue={frequency}/>
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