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
  const crearServicio = (articulo) => {
    let {id, nombreArticulo, descripcion ,precio, imgSrc, categorias, stock} = articulo;
    const articuloObjeto = new Servicio (id, nombreArticulo, descripcion, precio, imgSrc, categorias, 0, stock)
    return articuloObjeto
  }
  const crearServicios = async (listadoDB) => {
    var serviciosLista = [];
    listadoDB.forEach((servicio)=>{
      const servicioObjeto = crearServicio(servicio);
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
    //TODO Back API Call
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
    crearServicio,
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