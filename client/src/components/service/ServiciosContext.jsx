import React from 'react';
import { Servicio } from "../imports/classes";
import { useContext, useState } from 'react';

const ServiciosContext = React.createContext([]);
const useServicios = () => {
  return useContext(ServiciosContext);
}
const ServiciosProvider = ({defaultValue = [], children}) => {
  const [serviciosListadoDB, setServiciosListadoDB] = useState(defaultValue);
  const [serviciosLoaded, setServiciosLoaded] = useState(false);
  const instantiateServicio = (servicio) => {
    return new Servicio (servicio)
  }
  const crearServicios = async (listadoDB) => {
    var serviciosLista = [];
    listadoDB.forEach((servicio)=>{
      const servicioObjeto = instantiateServicio(servicio);
      serviciosLista.push(servicioObjeto);
    })
    return serviciosLista;
  }
  const guardarServicio = async (servicio) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(servicio)
    };
    return await fetch("http://localhost:8080/api/services", requestOptions).then(async (data) => {
      let jsonData = await data.json();
      let serviceCreado = instantiateServicio(jsonData);
      return serviceCreado;
    }).catch((err) => {
      console.log(err)
      return null
    })
  }
  const actualizarServicio = async (servicio) => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(servicio)
    };
    return await fetch("http://localhost:8080/api/services/"+servicio.id, requestOptions).then(async (data) => {
      // let jsonData = await data.json();
      // let serviceCreado = instantiateServicio(jsonData);
      return null;
    }).catch((err) => {
      console.log(err)
      return null
    })
  }
  const borrarServicio = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    return await fetch("http://localhost:8080/api/services/"+id, requestOptions).then(async (data) => {
      // let jsonData = await data.json();
      // let serviceCreado = instantiateServicio(jsonData);
      return null;
    }).catch((err) => {
      console.log(err)
      return null
    })
  }
  const cargarServicios = async () => {
    await fetch("http://localhost:8080/api/services").then(async (data) => {
      let listadoDB = []
      let jsonData = await data.json();
      (jsonData.length === undefined) ? (listadoDB.push(jsonData)) : (listadoDB = jsonData)
      let serviceListado = await crearServicios(listadoDB);
      setServiciosLoaded(true);
      setServiciosListadoDB(serviceListado);
    })
  }
  const obtenerServicioPorID = async (itemId) => {
    return await fetch("http://localhost:8080/api/services/"+itemId).then(async (data) => {
      let jsonData = await data.json();
      let serviceCreado = instantiateServicio(jsonData);
      return serviceCreado;
    }).catch((err) => {
      console.log(err);
      return null;
    })
  }
  const obtenerServiciosPorCategoria = async (categoryID) => {
    return await fetch("http://localhost:8080/api/services/category/"+categoryID).then(async (data) => {
      let jsonData = await data.json();
      let listadoDB = [];
      (jsonData.length === undefined) ? (listadoDB.push(jsonData)) : (listadoDB = jsonData)
      return await crearServicios(listadoDB);
    }).catch((err) => {
      console.log(err);
      return null;
    })
  }
  const obtenerServiciosPorCantidad = async (cantidad = 0) => {
    return await fetch("http://localhost:8080/api/services/recommended/"+cantidad).then(async (data) => {
      let jsonData = await data.json();
      let listadoDB = [];
      (jsonData.length === undefined) ? (listadoDB.push(jsonData)) : (listadoDB = jsonData)
      return await crearServicios(listadoDB);
    }).catch((err) => {
      console.log(err);
      return null;
    })
  }
  
  const obtenerServiciosPorResponsable = async (id) => {
    return await fetch("http://localhost:8080/api/services/user/"+id).then(async (data) => {
      let jsonData = await data.json();
      let listadoDB = [];
      if(Object.hasOwn(jsonData, 'message')){
        return null;
      }
      (jsonData.length === undefined) ? (listadoDB.push(jsonData)) : (listadoDB = jsonData)
      return await crearServicios(listadoDB);
    }).catch((err) => {
      console.log(err);
      return null;
    })
  }

  const guardarComentario = async (comentario, serviceId) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comentario)
    };
    return await fetch("http://localhost:8080/api/services/"+serviceId+"/comment", requestOptions).then(async (data) => {
      //let jsonData = await data.json();
      //let serviceCreado = instantiateServicio(jsonData);
      //return serviceCreado;
    }).catch((err) => {
      console.log(err)
      return null
    })
  }

  const reviewComentario = async (req, serviceId, commentID) => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    };
    return await fetch("http://localhost:8080/api/services/"+serviceId+"/comment/"+commentID, requestOptions).then(async (data) => {
      //let jsonData = await data.json();
      //let serviceCreado = instantiateServicio(jsonData);
      //return serviceCreado;
    }).catch((err) => {
      console.log(err)
      return null
    })
  }

  const guardarImagen = async (file) => {
    const data = new FormData();
    data.append("file", file);
    return await fetch('http://localhost:8080/api/images', {
      method: 'POST',
      credentials: 'include',
      body: data
    }).then( async (data) => {
      let jsonData = await data.json();
      return jsonData.path
    }).catch((err) => {
      console.log(err)
      return null
    })
  }

  const cargarImagen = async (path) => {
    return await fetch('http://localhost:8080/api/images/'+path, {
      method: 'GET'
    }).then( async (data) => {
      const image = await data.blob()
      return URL.createObjectURL(image)
    }).catch((err) => {
      console.log(err)
      return null
    })
  }

  const context = {
    serviciosLoaded,
    serviciosListadoDB,
    setServiciosLoaded,
    obtenerServicioPorID,
    cargarServicios,
    instantiateServicio,
    obtenerServiciosPorCategoria,
    obtenerServiciosPorCantidad,
    obtenerServiciosPorResponsable,
    guardarServicio,
    actualizarServicio,
    guardarComentario,
    reviewComentario,
    borrarServicio,
    guardarImagen,
    cargarImagen
  }
  return (
    <ServiciosContext.Provider value={context}>
      {children}
    </ServiciosContext.Provider>
  )

}
export {useServicios, ServiciosProvider}