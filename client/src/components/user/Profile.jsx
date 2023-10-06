import React from 'react';
import { useUsuario } from '../user/UserContext';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import PendingComments from '../comment/PendingComments';

const Profile = () => {
    const { usuario, instantiateUser, updateUser, setUsuarioNuevo} = useUsuario();
    const  [userPerfil, setUserPerfil] = useState("");
    const isLoggedIn = !(usuario === null);
    const [newExperience, setExperience] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newTitle, setTitle] = useState('');
    const [newPhone, setPhone] = useState('');
    const [newPassword, setPassword] = useState('');

    useEffect(() => {
      if(isLoggedIn){
        setExperience(usuario.experience);
        setTitle(usuario.title)
        setEmail(usuario.email);
        setPhone(usuario.phone);
        setPassword(usuario.password);
        setUserPerfil(usuario);
      }
      else{
        let nullUser = {id: "null", name: "null", lastname: "null", password: "null", email: "null", phone: "null", title: "null", experience: "[]"}
        setUserPerfil(instantiateUser(nullUser))
      }
    }, [isLoggedIn, usuario, instantiateUser])

    const handleChangeExperience = (e) => {
        setExperience(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleChangeTelefono = (e) => {
        setPhone(e.target.value.slice(0,e.target.maxLength));
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const realizarCambios = async (e) => {
        e.preventDefault()
        let inputElements = document.querySelectorAll("input");
        let correctPassword = false;
        let correctEmail = false;
        let correctExperience = false;
        let correctTitle = false;
        let correctPhone = false;
        inputElements.forEach(function(input) {
            switch(input.name){
                case 'passwordConfirm':
                    if(input.value.toString() === newPassword){
                        correctPassword = true;
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
                case 'experience':
                    if(input.value.toString() !== ""){
                        correctExperience = true;
                    }
                    break;
                case 'title':
                    if(input.value.toString() !== ""){
                        correctTitle = true;
                    }
                    break;
                case 'telefono':
                    if(input.value.toString().length === 10){
                        correctPhone = true;
                    }
                    break;
                default:
                    break;
            }
        });
        if (correctExperience && correctPassword && correctEmail && correctTitle && correctPhone){
            let newUserInfo = instantiateUser({
                id: userPerfil.id,
                name: userPerfil.name,
                lastname: userPerfil.lastname,
                password: newPassword, 
                experience: newExperience, 
                email: newEmail, 
                title: newTitle, 
                phone: newPhone
            });
            let userEdited = await updateUser(newUserInfo);
            if(userEdited === null){
                swal("Usuario no modificado", "Desafortunadamente, hubo un problema con la página. Por favor, intentar nuevamente en unos instantes.", "error");
            }
            else{
                swal("Usuario modificado!", "Los datos de usuario se registraron correctamente!", "success");
                setUsuarioNuevo(newUserInfo); 
            }
        }
        else{
            swal("Información errónea", "Los datos ingresados son incorrectos. Por favor, revisar e intentar nuevamente.", "error");
        }
    }

    return (
        <div>
            {(!isLoggedIn) && <Navigate to="/"/> }
            <div className="profileContainer">
                <div className="perfilDiv">
                    <h3>Bienvenido {userPerfil.name} {userPerfil.lastname} !</h3>
                    <h5>Esta es la pestaña de edición de datos</h5>
                    <p>Para editar los datos del usuario, ingresar los datos y luego cambiar datos una vez revisada la información ingresada.</p>    
                    <form action="" className="m-5">
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Nombre y Apellido</span>
                                </div>
                            <input type="text" className="form-control" placeholder="Nombre del Usuario" name="username" readOnly="readOnly" defaultValue={userPerfil.name}/>
                            <input type="text" className="form-control" placeholder="Apellido del Usuario" name="username" readOnly="readOnly" defaultValue={userPerfil.lastname}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Titulo del usuario</span>
                                </div>
                            <input type="text" className="form-control" placeholder="Titulo del usuario" name="title" value={newTitle} onChange={handleChangeTitle}/>
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
                                    <span className="input-group-text" id="basic-addon1">Telefono</span>
                                </div>
                            <input type="number" className="form-control" placeholder="Telefono del usuario" name="telefono" value={newPhone} minLength={10} maxLength={10} onChange={handleChangeTelefono}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Experiencia</span>
                                </div>
                            <input type="text" className="form-control" placeholder="Experiencia" name="experience" value={newExperience} onChange={handleChangeExperience}/>
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
                            <input type="password" className="form-control" placeholder="Reingresar Contraseña" value={newPassword} name="passwordConfirm"/>
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