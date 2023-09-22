import React from 'react';
import usuarioImagen from '../../images/usuario.svg';
import passwordImagen from '../../images/password.svg';
import emailImagen from '../../images/email.svg';
import telefonoImagen from '../../images/telefono.svg';
import {nuevoUsuario} from "../../api/service/userService.ts";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './style.scss';

const Register = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    let navigate = useNavigate();

    const handleChangeNombreUsuario = (e) => {
        setNombreUsuario(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleChangeDireccion = (e) => {
        setDireccion(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangeDni = (e) => {
        setDni(e.target.value.slice(0,e.target.maxLength));
    }
    const handleChangeTelefono = (e) => {
        setTelefono(e.target.value.slice(0,e.target.maxLength));
    }

    const registrarUsuario = async (e) => {

        let inputElements = document.querySelectorAll("input");
        let allInputsFilled = true;
        inputElements.forEach(function(input) {
            if(input.value === ""){
                allInputsFilled = false;
            }
            if(input.id === "email"){
                let lastAtPos = input.value.lastIndexOf("@");
                let lastDotPos = input.value.lastIndexOf(".");
                if (!(
                      lastAtPos < lastDotPos &&
                      lastAtPos > 0 &&
                      lastDotPos > 2 &&
                      input.value.toString().length - lastDotPos > 2 &&
                      lastDotPos - lastAtPos > 1
                    )) {
                        allInputsFilled = false;
                  }
            }

        });
        console.log(allInputsFilled)
        if (allInputsFilled){
            const id = nombreUsuario;
            const user = {
                id, nombreUsuario, password, email, telefono
            }
            console.log(user)
            nuevoUsuario(user).then(res => {
                let path = `/ecommerce-frontend/login`; 
                navigate(path);
            })
        }
        else{
            swal("Información incorrecta", "La información ingresada es erronea! Por favor revisar la información ingresada y en caso de ser correcta contactarse con el soporte", "warning");
        }
    }
  return (
    <main>
        <div id="registerDiv">
            <h2>Registrarse</h2>
            <form onSubmit={(e)=>{e.preventDefault()}}>
                <div id="container">
                    <label htmlFor="usuario" className="registerLabelForm">
                        <img src={usuarioImagen} alt=""/>
                        <span>Nombre y apellido</span>
                        <input type="text" id="usuario" value={nombreUsuario} onChange={handleChangeNombreUsuario} required/>
                    </label>
                    <label htmlFor="email" className="registerLabelForm">
                        <img src={emailImagen} alt=""/>
                        <span>Direccion de correo</span>
                        <input type="email" id="email" value={email} onChange={handleChangeEmail} required/>
                    </label>
                    <label htmlFor="contrasenia" className="registerLabelForm">
                        <img src={passwordImagen} alt=""/>
                        <span>Contraseña</span>
                        <input type="password" id="contrasenia" value={password} onChange={handleChangePassword} required/>
                    </label>
                    <label htmlFor="telefono" className="registerLabelForm">
                        <img src={telefonoImagen} alt=""/>
                        <span>Numero de telefono</span>
                        <input type="number" id="telefono" value={telefono} onChange={handleChangeTelefono} minLength={10} maxLength={10} required/>
                    </label>
                    <button type="submit" className="btn btn-outline-dark" id="buttonRegisterForm" onClick={registrarUsuario}>Registrarse</button>
                </div>
            </form>
        </div>
        <hr />
    </main>
  )
}

export default Register