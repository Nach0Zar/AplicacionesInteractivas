import React from 'react';
import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsuario } from './UserContext';
import swal from 'sweetalert';

const ModalPassword = (props) => {
    let navigate = useNavigate();
    const show = props.show;
    const handleClose = props.onHide;
    const [email, setEmail] = useState(undefined);
    const { checkExistingUser, restorePassword } = useUsuario();

    useEffect(() => {
        if(email === undefined && props.email !== ""){
            setEmail(props.email)
        }
    }, [email, props.email])

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const validateEmailFormat = () => {
        //TODO validate email format
        return true;
    }
    const validateEmail = async () => {
        return await checkExistingUser(email);
    }
    const cambiarContrasenia = async (e) => {
        if (validateEmailFormat()){
            let userID = await validateEmail();
            if(userID !== undefined){
                await restorePassword(userID)
                .then(()=> {
                    swal("Contraseña reiniciada!", "Se te ha enviado la nueva contraseña a la casilla " + email, "success");
                }).catch(()=>{
                    swal("Contraseña no reiniciada", "Desafortunadamente, hubo un problema con la página. Por favor, intenta nuevamente en unos instantes.", "error");
                });
                handleClose();
                navigate("/");
            }
            else{
                swal("Información errónea", "Los datos de email son incorrectos. Por favor, revisar e intentar nuevamente.", "error");
            }
        }
    }
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Restaurar contraseña</Modal.Title>
        </Modal.Header>
        <form className="form-horizontal" onSubmit={(e)=>{e.preventDefault()}}>
            <Modal.Body>
            <div className="centered">
                <p>Estas a punto de reiniciar tu contraseña, ¿estás seguro de querer hacerlo?</p>
                <p>Confirmar que su email de contacto es el correcto.</p>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Mail de contacto</span>
                            </div>
                        <input type="email" className="form-control" placeholder="Mail del usuario" name="email" defaultValue={email} onChange={handleChangeEmail}/>
                        </div>
                    </div>
                <p>La contraseña temporal sera enviada al mail seleccionado.</p>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
                <button type="submit" className="btn btn-outline-secondary" name="comprar" id="realizarCompra" value="Submit" onClick={cambiarContrasenia}>Reiniciar contraseña</button>
            </Modal.Footer>
            </form>
        </Modal>
    </>
  )
}

export default ModalPassword