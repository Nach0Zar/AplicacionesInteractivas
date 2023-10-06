import React from 'react';
import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useUsuario } from '../user/UserContext';
import { Usuario } from '../imports/classes';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useOrder } from '../order/OrderContext';

const ModalContactForm = (props) => {
    let navigate = useNavigate();
    const show = props.show;
    const handleClose = props.onHide;
    const [usuarioDatos, setUsuarioDatos] = useState('');
    const { usuario } = useUsuario();
    const { createOrder } = useOrder();

    useEffect(() => {
        if(usuario === null){
            setUsuarioDatos(new Usuario("nombreUsuario", "", "", "ejemplo@test.com", "12345678", "1111111111"));
        }
        else{
            setUsuarioDatos(usuario);
        }
    }, [usuario])
    const realizarComentario = (e) => {
        e.preventDefault()
        const { email, dni, telefono } = e.target.elements
        let conFom = {
          email: email.value,
          dni: dni.value,
          telefono: telefono.value,
        }
        console.log(conFom)
        swal("Contacto exitoso")
        handleClose()
    }
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Contacta a tu profe</Modal.Title>
        </Modal.Header>
        <form className="form-horizontal" onSubmit={realizarComentario}>
            <Modal.Body>
            <div className="centered">
                <p>Por favor, complete esta informacion para tu profe pueda ponerse en contacto contigo</p>
                <p>Te pedimos que verifiques que la informacion es la correcta antes de confirmar</p>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Mail de contacto</span>
                            </div>
                        <input type="email" className="form-control" placeholder="tuMail@dominio.com" name="email" defaultValue={usuarioDatos.email}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">DNI</span>
                            </div>
                        <input type="text" className="form-control" placeholder="DNI del usuario" name="dni" defaultValue={usuarioDatos.dni}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Telefono</span>
                            </div>
                        <input type="text" className="form-control" placeholder="99999999" name="telefono" defaultValue={usuarioDatos.telefono}/>
                        </div>
                    </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
                <button type="submit" className="btn btn-outline-secondary" name="comprar">Contactar</button>
            </Modal.Footer>
            </form>
        </Modal>
    </>
  )
}

export default ModalContactForm