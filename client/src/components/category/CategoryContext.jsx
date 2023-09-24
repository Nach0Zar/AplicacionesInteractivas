import React from 'react';
import { Categoria } from "../imports/classes";
import { useContext, useState } from 'react';

const CategoryContext = React.createContext([]);
const useCategorias = () => {
  return useContext(CategoryContext);
}
const CategoryProvider = ({defaultValue = [], children}) => {
  const [categoriasListadoDB, setCategoriasListadoDB] = useState(defaultValue);
  const [categoriasLoaded, setCategoriasLoaded] = useState(false);

  const instantiateCategoria = (categoria) => {
    return new Categoria (categoria)
  }

  const crearCategorias = async (listadoDB) => {
    var categoriasLista = [];
    listadoDB.forEach((categoria)=>{
      const categoriaObjeto = instantiateCategoria(categoria);
      categoriasLista.push(categoriaObjeto);
    })
    return categoriasLista;
  }

  const cargarCategorias = async () => {
    await fetch("http://localhost:8080/api/categories").then(async (data) => {
      let listadoDB = []
      let jsonData = await data.json();
      (jsonData.length === undefined) ? (listadoDB.push(jsonData)) : (listadoDB = jsonData)
      let categoriasListado = await crearCategorias(listadoDB);
      setCategoriasLoaded(true);
      setCategoriasListadoDB(categoriasListado);
    })
  }

  const obtenerCategoriaPorID = async (categoryId) => {
    return await fetch("http://localhost:8080/api/categories/"+categoryId).then(async (data) => {
      let jsonData = await data.json();
      let categoriaCreada = instantiateCategoria(jsonData);
      return categoriaCreada;
    }).catch((err) => {
      console.log(err);
      return null;
    })
  }
  const obtenerCategoriasPorServicio = async (servicio) => {
    var categoriasSeleccionadas = [];
    categoriasListadoDB.forEach((categoria)=>{
      if(servicio.categories.includes(categoria.id)){
        categoriasSeleccionadas.push(categoria)
      }
    })
    return categoriasSeleccionadas;
  }
  const context = {
    categoriasLoaded,
    categoriasListadoDB,
    cargarCategorias,
    obtenerCategoriaPorID,
    obtenerCategoriasPorServicio
  }
  return (
    <CategoryContext.Provider value={context}>
      {children}
    </CategoryContext.Provider>
  )
}
export {useCategorias, CategoryProvider}