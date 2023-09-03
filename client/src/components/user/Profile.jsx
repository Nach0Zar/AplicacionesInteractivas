import React from 'react';
import { useUsuario } from '../user/UserContext';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Usuario } from '../imports/classes';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import swal from 'sweetalert';

const Profile = () => {
    const { usuario, loguearUser } = useUsuario();
    const  [userPerfil, setUserPerfil] = useState("");
    const isLoggedIn = !(usuario === null);
    const [newDireccion, setDireccion] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newDni, setDni] = useState('');
    const [newTelefono, setTelefono] = useState('');
    const [newPassword, setPassword] = useState('');

    useEffect(() => {
      if(isLoggedIn){
        var usuarioAuxiliar = new Usuario(usuario.nombreUsuario, usuario.password, usuario.direccion, usuario.email, usuario.dni, usuario.telefono)
        setDireccion(usuario.direccion);
        setDni(usuario.dni)
        setEmail(usuario.email);
        setTelefono(usuario.telefono);
        setPassword(usuario.password);
        setUserPerfil(usuarioAuxiliar);
      }
      else{
        setUserPerfil(new Usuario("null", "null", "null", "null", "null", "null"))
      }
    }, [isLoggedIn, usuario])

    const handleChangeDireccion = (e) => {
        setDireccion(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangeDni = (e) => {
        setDni(e.target.value.toString().slice(0,e.target.maxLength));
    }
    const handleChangeTelefono = (e) => {
        setTelefono(e.target.value.slice(0,e.target.maxLength));
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const realizarCambios = async (e) => {
        e.preventDefault()
        let inputElements = document.querySelectorAll("input");
        let correctContraseña = false;
        let correctEmail = false;
        let correctDireccion = false;
        let correctDNI = false;

        inputElements.forEach(function(input) {
            switch(input.name){
                case 'passwordConfirm':
                    if(input.value.toString() === newPassword){
                        correctContraseña = true;
                    }
                    break;
                case 'email':
                    let lastAtPos = input.value.lastIndexOf("@");
                    let lastDotPos = input.value.lastIndexOf(".");
                    if ((
                            lastAtPos < lastDotPos &&
                            lastAtPos > 0 &&
                            lastDotPos > 2 &&
                            input.value.toString().length - lastDotPos > 2 &&
                            lastDotPos - lastAtPos > 1
                        )) {
                            correctEmail = true;
                        }
                    break;
                case 'direccion':
                    if(input.value.toString() !== ""){
                        correctDireccion = true;
                    }
                    break;
                case 'dni':
                    if(input.value.toString().length === 8){
                        correctDNI = true;
                    }
                    break;
                default:
                    break;
            }
        });
        if (correctDireccion && correctContraseña && correctEmail && correctDNI){
            const db = getFirestore();
            const usuarioDoc = doc(db, "usuarios", userPerfil.nombreUsuario);
            getDoc(usuarioDoc).then(()=>{
                updateDoc(usuarioDoc, {
                    password: newPassword, 
                    direccion: newDireccion, 
                    email: newEmail, 
                    dni: newDni, 
                    telefono: newTelefono
                });
            }).catch((err)=>{
                console.log(err)
                swal("Usuario no modificado", "Desafortunadamente, hubo un problema con la página. Por favor, intentar nuevamente en unos instantes.", "error");
            });
            swal("Usuario modificado!", "Los datos de usuario se registraron correctamente!", "success");
            const usuarioEditado = new Usuario (userPerfil.nombreUsuario, newPassword, newDireccion, newEmail, newDni, newTelefono)
            loguearUser(usuarioEditado);
        }
        else{
            swal("Información errónea", "Los datos ingresados son incorrectos. Por favor, revisar e intentar nuevamente.", "error");
        }
    }

    return (
        <div>
            {(!isLoggedIn) && <Navigate to="/ecommerce-frontend/"/> }
            <div className="profileContainer">
                <div className="perfilDiv">
                    <h3>Bienvenido {userPerfil.nombreUsuario} !</h3>
                    <h5>Esta es la pestaña de edición de datos</h5>
                    <p>Para editar los datos del usuario, ingresar los datos y luego cambiar datos una vez revisada la información ingresada.</p>    
                    <form action="" className="m-5">
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">@</span>
                                </div>
                            <input type="text" className="form-control" placeholder="Nombre de Usuario" name="username" readOnly="readOnly" defaultValue={userPerfil.nombreUsuario}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Mail de contacto</span>
                                </div>
                            <input type="email" className="form-control" placeholder="Mail del usuario" name="email" value={newEmail} onChange={handleChangeEmail}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Direccion</span>
                                </div>
                            <input type="text" className="form-control" placeholder="Direccion" name="direccion" value={newDireccion} onChange={handleChangeDireccion}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">DNI</span>
                                </div>
                            <input type="number" className="form-control" placeholder="DNI del usuario" name="dni" minLength={8} maxLength={8} value={newDni} onChange={handleChangeDni}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Telefono</span>
                                </div>
                            <input type="number" className="form-control" placeholder="Telefono del usuario" name="telefono" value={newTelefono} minLength={10} maxLength={10} onChange={handleChangeTelefono}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Contraseña</span>
                                </div>
                            <input type="password" className="form-control" placeholder="Contraseña" name="password" value={newPassword} onChange={handleChangePassword}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Reingresar Contraseña</span>
                                </div>
                            <input type="password" className="form-control" placeholder="Reingresar Contraseña" name="passwordConfirm"/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary" name="cambiarUsuario" value="Submit" onClick={realizarCambios}>Cambiar datos</button>
                    </form>
                </div>
            </div>
        <hr />
        </div>
    )
}

export default Profile