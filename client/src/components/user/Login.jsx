import React from 'react';
import usuarioImagen from '../../images/usuario.svg';
import passwordImagen from '../../images/password.svg';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState } from 'react';
import { useUsuario } from './UserContext';
import { Usuario } from '../imports/classes';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './style.scss'

const Login = () => {
    let navigate = useNavigate();
    const { loguearUser } = useUsuario();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const handleChangeNombreUsuario = (e) => {
        setNombreUsuario(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const loguearUsuario = async (e) => {
        let inputElements = document.querySelectorAll("input");
        let allInputsFilled = true;
        inputElements.forEach(function(input) {
            if(input.value === ""){
                allInputsFilled = false;
            }

        });
        if (allInputsFilled){
            const db = getFirestore();
            const usuarioDoc = doc(db, "usuarios", nombreUsuario);
            const usuarioSnap = await getDoc(usuarioDoc);
            if(usuarioSnap.data()){
                if (usuarioSnap.data().password === password){
                    swal("Login","Usuario logueado correctamente!", "success");
                    const usuario = new Usuario (usuarioSnap.data().nombreUsuario, usuarioSnap.data().password, usuarioSnap.data().direccion, usuarioSnap.data().email, usuarioSnap.data().dni, usuarioSnap.data().telefono)
                    loguearUser(usuario);
                    let path = `/ecommerce-frontend/`; 
                    navigate(path);
                }
                else{
                    swal("Información errónea","Contraseña incorrecta, por favor indicar la contraseña correcta","warning");
                }
                
            }
            else{
                swal("Usuario inexistente","El Nombre de Usuario no existe. Pruebe registrandolo!", "error");
            }
        }
        
    }
  return (
    <main>
        <div id="loginDiv">
            <h2>Login</h2>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <div id="container">
                    <label htmlFor="usuario" className="loginLabelForm">
                        <img src={usuarioImagen} alt=""/>
                        <span>Nombre de usuario</span>
                        <input type="text" id="usuario" value={nombreUsuario} onChange={handleChangeNombreUsuario} required/>
                    </label>
                    <label htmlFor="contrasenia" className="loginLabelForm">
                        <img src={passwordImagen} alt=""/>
                        <span>Contraseña</span>
                        <input type="password" id="contrasenia" value={password} onChange={handleChangePassword} required/>
                    </label>
                    <button type="submit" className="btn btn-outline-dark" id="buttonLoginForm" onClick={loguearUsuario}>Loguearse</button>
                </div>
            </form>
        </div>
        <hr/>
    </main>
  )
}

export default Login