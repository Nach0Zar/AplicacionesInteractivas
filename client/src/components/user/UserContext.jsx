import React from 'react';
import { useContext, useState } from 'react';
import { Usuario } from '../imports/classes';

const UsuarioContext = React.createContext([]);
  

  const useUsuario = () => {
    return useContext(UsuarioContext);
  }

  const UsuarioProvider = ({defaultValue = null, children}) => {
    
    const [usuario, setUsuario] = useState(defaultValue);

    const instantiateUser = (usuario) => {
      console.log(usuario)
      return new Usuario(usuario);
    }

    const loguearUser = async (usuario) => {
      return await fetch("http://localhost:8080/api/sessions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        credentials: 'include',
        body: JSON.stringify(usuario)
      }).then(async (response) => {
        if(!(response.ok)){
          return false;
        }
        return await fetch("http://localhost:8080/api/users", {
          credentials: 'include'
          }).then(async (data) => {
          let jsonData = await data.json();
          jsonData.password = usuario.password;
          let validatedUser = instantiateUser(jsonData);
          console.log(validatedUser)
          setUsuario(validatedUser);
          return true;
        }).catch((err)=>{
          console.log("User information fetch failed with error: "+err);
          return null;
        })
      }).catch((err)=>{
        console.log("User login validation failed with error: "+err);
        return null;
      })
    }

    const desloguearUser = async () => {
      await fetch("http://localhost:8080/api/logout", {
        method: 'POST',
        credentials: 'include'
        }).catch((err)=>{
        console.log("User logoff failed with error: "+err);
      })
      setUsuario(null);
    }

    const restorePassword = () => {
      //TODO restore password functionality
    }

    const registerUser = async (usuario) => {
      usuario.id = ""
      return await fetch("http://localhost:8080/api/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        credentials: 'include',
        body: JSON.stringify(usuario)
      }).then(async (response) => {
        if(!(response.ok)){
          return false;
        }
        return true;
      }).catch((err)=>{
        console.log("User register validation failed with error: "+err);
        return null;
      })
    }

    const context = {
      usuario,
      loguearUser,
      registerUser,
      restorePassword,
      desloguearUser
    }
    
  return (
    <UsuarioContext.Provider value={context}>
      {children}
    </UsuarioContext.Provider>
  )

}
export {useUsuario, UsuarioProvider}