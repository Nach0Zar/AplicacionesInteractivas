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
    console.log(listadoDB)
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
    console.log(servicio)
    return await fetch("http://localhost:8080/api/services/"+servicio.id, requestOptions).then(async (data) => {
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
      (jsonData.length === undefined) ? (listadoDB.push(jsonData)) : (listadoDB = jsonData)
      return await crearServicios(listadoDB);
    }).catch((err) => {
      console.log(err);
      return null;
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
    actualizarServicio
  }
  return (
    <ServiciosContext.Provider value={context}>
      {children}
    </ServiciosContext.Provider>
  )

}
export {useServicios, ServiciosProvider}