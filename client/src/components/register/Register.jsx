import React from 'react';
import usuarioImagen from '../../images/usuario.svg';
import passwordImagen from '../../images/password.svg';
import emailImagen from '../../images/email.svg';
import telefonoImagen from '../../images/telefono.svg';
import {nuevoUsuario} from "../../api/service/userService.ts";
import { useState } from 'react';
import { useUsuario } from '../user/UserContext';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './style.scss';

const Register = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    let navigate = useNavigate();
    const { registerUser } = useUsuario();

    const handleChangename = (e) => {
        setName(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleChangeApellido = (e) => {
        setLastname(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangeTelefono = (e) => {
        setPhone(e.target.value.slice(0,e.target.maxLength));
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
            if(input.id === "telefono"){
                if(!(input.value.length === 10)){
                    allInputsFilled = false;
                }
            }
        });
        if (allInputsFilled){
            const user = {
                name, lastname, password, email, phone
            }
            registerUser(user).then(res => {
                let path = `/login`; 
                navigate(path);
                swal("Rgistro","Usuario registrado correctamente!", "success");
            }).catch(()=>{
                swal("Error del sistema","No se pudo validar el registro de usuario, por favor vuelva a intentar mas tarde","error");
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
                    <label htmlFor="usuario" className="registerLabelForm nameAndSurname">
                        <img src={usuarioImagen} alt=""/>
                        <span>Nombre y apellido</span>
                        <div>
                            <input type="text" id="nombre" value={name} onChange={handleChangename} required/>
                            <input type="text" id="apellido" value={lastname} onChange={handleChangeApellido} required/>
                        </div>
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
                        <input type="number" id="telefono" value={phone} onChange={handleChangeTelefono} minLength={10} maxLength={10} required/>
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