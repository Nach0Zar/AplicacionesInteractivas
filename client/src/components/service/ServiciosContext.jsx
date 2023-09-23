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
    let {id, name, description, price, responsible, categories, duration, frequency, comments, qualification, image} = servicio;
    const servicioObjeto = new Servicio (id, name, description, price, responsible, categories, duration, frequency, comments, qualification, image)
    return servicioObjeto
  }
  const crearServicios = async (listadoDB) => {
    var serviciosLista = [];
    listadoDB.forEach((servicio)=>{
      const servicioObjeto = instantiateServicio(servicio);
      serviciosLista.push(servicioObjeto);
    })
    return serviciosLista;
  }
  const cargarServicios = async () => {
    await fetch("http://localhost:8080/api/services").then(async (data) => {
      let listadoDB = []
      let jsonData = await data.json();
      (jsonData.length === undefined) ? (listadoDB.push(jsonData)) : (listadoDB = jsonData)
      let articulosListado = await crearServicios(listadoDB);
      setServiciosLoaded(true);
      setServiciosListadoDB(articulosListado);
    })
  }
  const obtenerServicioPorID = async (itemId) => {
    return await fetch("http://localhost:8080/api/services/"+itemId).then(async (data) => {
      let jsonData = await data.json();
      let articuloCreado = instantiateServicio(jsonData);
      return articuloCreado;
    }).catch((err) => {console.log(err)})
  }
   const obtenerServiciosPorCategoria = async (categoria) => {
    //TODO Back API Call
  }
  const obtenerServiciosPorCantidad = async (cantidad = 0) => {
    //TODO Back API Call
  }
  const context = {
    serviciosLoaded,
    serviciosListadoDB,
    setServiciosLoaded,
    obtenerServicioPorID,
    cargarServicios,
    instantiateServicio,
    obtenerServiciosPorCategoria,
    obtenerServiciosPorCantidad
  }
  return (
    <ServiciosContext.Provider value={context}>
      {children}
    </ServiciosContext.Provider>
  )

}
export {useServicios, ServiciosProvider}