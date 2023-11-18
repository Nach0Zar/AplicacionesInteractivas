import React, { useEffect } from 'react';
import emailImagen from '../../images/email.svg';
import passwordImagen from '../../images/password.svg';
import { useState } from 'react';
import { useUsuario } from './UserContext';
import { useNavigate } from 'react-router-dom';
import ModalPassword from './ModalPassword';
import swal from 'sweetalert';
import './style.scss'

const Login = () => {
    let navigate = useNavigate();
    const { loguearUser } = useUsuario();
    const [emailUsuario, setEmailUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChangeEmailUsuario = (e) => {
        setEmailUsuario(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    
    useEffect(() => {
    }, [emailUsuario])

    const loguearUsuario = async (e) => {
        let inputElements = document.querySelectorAll("input");
        let allInputsFilled = true;
        let emailFormat = true;
        inputElements.forEach(function(input) {
            if(input.id === 'email'){
                let lastAtPos = input.value.lastIndexOf("@");
                let lastDotPos = input.value.lastIndexOf(".");
                if (!(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    lastDotPos > 2 &&
                    input.value.toString().length - lastDotPos > 2 &&
                    lastDotPos - lastAtPos > 1
                )) {
                    emailFormat = false;
                }
            }
            if(input.value === ""){
                allInputsFilled = false;
            }
        });
        if(emailFormat){
            if (allInputsFilled){
                let loggedUser = await loguearUser({email: emailUsuario, password: password});
                if(loggedUser === true){
                    swal("Login","Usuario logueado correctamente!", "success");
                    let path = `/`; 
                    navigate(path);
                }
                else {
                    if(loggedUser === false){
                        swal("Información errónea","Contraseña incorrecta, por favor indicar la contraseña correcta","warning");
                    }
                    else{
                        swal("Error del sistema","No se pudo validar el login de usuario, por favor vuelva a intentar mas tarde","error");
                    }
                }
            }
            else{
                swal("Informacion faltante","Por favor, ingrese email y contraseña", "error");
            }
        }
        else{
            swal("Informacion erronea","Formato de email incorrecto. Por favor, ingrese email y contraseña", "error");
        }
    }
  return (
    <main>
        <div id="loginDiv">
            <h2>Login</h2>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <div className="container">
                    <label htmlFor="email" className="loginLabelForm">
                        <img src={emailImagen} alt=""/>
                        <span>Direccion de correo</span>
                        <input type="text" id="email" value={emailUsuario} onChange={handleChangeEmailUsuario} required/>
                    </label>
                    <label htmlFor="contrasenia" className="loginLabelForm">
                        <img src={passwordImagen} alt=""/>
                        <span>Contraseña</span>
                        <input type="password" id="contrasenia" value={password} onChange={handleChangePassword} required/>
                    </label>
                    <div id="containerButton">
                        <button type="submit" className="btn btn-outline-dark" id="buttonLoginForm" onClick={loguearUsuario}>Loguearse</button>
                        <button className="btn btn-outline-dark" id="buttonLoginForm" onClick={handleShow}>Olvide contraseña</button>
                        <ModalPassword email={emailUsuario} show={show} onHide={handleClose}/>
                    </div>
                </div>
            </form>
        </div>
        <hr/>
    </main>
  )
}

export default Login