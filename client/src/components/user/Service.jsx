import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCategorias } from '../category/CategoryContext';

const Service = (props) => {
  const service = props.service;
  const URLPage = '/service/'+service.id;
  console.log(service)
  const { obtenerCategoriaPorID, obtenerCategoriasPorServicio} = useCategorias();
  const [categories, setCategories] = useState("");
  useEffect(() => {
    if(categories.length === 0){
      let serviceCategories = [];// = obtenerCategoriasPorServicio(servicio);
      service.categories.forEach(async (category) => {
        serviceCategories.push(category);
        //serviceCategories.push(await obtenerCategoriaPorID(category));
      });
      setCategories(serviceCategories.join(", "))
    }
      
  }, [categories, setCategories, service.categories, obtenerCategoriaPorID])

  return (
    <Link to={URLPage} className="noDecoration">
      <div className="service">
        <h2>Titulo del servicio: {service.name}</h2>
        <h4>Frecuencia: {service.frequency}</h4>
        <h4>Calificacion: {service.qualification}</h4>
        <h4>Tipo: {service.type}</h4>
        <h4>Categorias: {categories}</h4>
        <h4>Precio: ${service.price}</h4>
      </div>
    </Link>
  )
}
export default Service