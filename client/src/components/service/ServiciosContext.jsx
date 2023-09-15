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
  const cargarServicios = async () => {
    //Back API Call
  }
  const crearServicio = (servicio) => {
    //Back API Call
  }
  const obtenerItemPorID = async (itemId) => {
    //Back API Call
  }
   const obtenerItemsPorCategoria = async (categoria) => {
    //Back API Call
  }
  const obtenerServiciosPorCantidad = async (cantidad = 0) => {
    //Back API Call
  }
  const context = {
    serviciosLoaded,
    serviciosListadoDB,
    setServiciosLoaded,
    obtenerItemPorID,
    cargarServicios,
    crearServicio,
    obtenerItemsPorCategoria,
    obtenerServiciosPorCantidad
  }
  return (
    <ServiciosContext.Provider value={context}>
      {children}
    </ServiciosContext.Provider>
  )

}
export {useServicios, ServiciosProvider}