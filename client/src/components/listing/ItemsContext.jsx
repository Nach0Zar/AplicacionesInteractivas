import React from 'react';
import { Articulo } from "../imports/classes";
import { useContext, useState } from 'react';
import { collection, getDocs, getFirestore, query, where, limit, getDoc, doc } from "firebase/firestore";

const ArticulosContext = React.createContext([]);
  const useArticulos = () => {
    return useContext(ArticulosContext);
  }
  const ArticulosProvider = ({defaultValue = [], children}) => {
  const [articulosListadoDB, setArticulosListadoDB] = useState(defaultValue);
  const [articulosLoaded, setArticulosLoaded] = useState(false);
  const cargarArticulos = async () => {
    const db = getFirestore();
    var listadoDB = [];
    const articulosRef = collection(db, "catalogo");
    await getDocs(articulosRef).then((articulo)=>{
      listadoDB = articulo.docs.map((doc)=>(
        {id: doc.id, ...doc.data()}))
    })
    var articulosListado = await crearArticulos(listadoDB);
    setArticulosLoaded(true);
    setArticulosListadoDB(articulosListado);
  }
  const crearArticulo = (articulo) => {
    let {id, nombreArticulo, descripcion ,precio, imgSrc, categorias, stock} = articulo;
    const articuloObjeto = new Articulo (id, nombreArticulo, descripcion, precio, imgSrc, categorias, 0, stock)
    return articuloObjeto
  }
  const obtenerItemPorID = async (itemId) => {
    const db = getFirestore();
    var listadoDB;
    const articuloRef = doc(db, "catalogo", itemId.toString());
    await getDoc(articuloRef).then((articulo)=>{
      listadoDB = {id: articulo.idCategoria, ...articulo.data()}
    })
    var articuloCreado = await crearArticulo(listadoDB);
    return articuloCreado;
  }
   const obtenerItemsPorCategoria = async (categoria) => {
    const db = getFirestore();
    var listadoDB = [];
    const articulosRef = query(
      collection(db, "catalogo"),
      where("categorias", "array-contains", categoria.idCategoria)
    );
    await getDocs(articulosRef).then((articulo)=>{
      listadoDB = articulo.docs.map((doc)=>({id: doc.id, ...doc.data()}))
    })
    var articulosLista = await crearArticulos(listadoDB);
    return articulosLista;
  }
  const crearArticulos = async (listadoDB) => {
    var articulosLista = [];
    listadoDB.forEach((articulo)=>{
      const articuloObjeto = crearArticulo(articulo);
      articulosLista.push(articuloObjeto);
    })
    return articulosLista;
  }
  const obtenerArticulosPorCantidad = async (cantidad = 0) => {
    if(cantidad === 0){
      return articulosListadoDB;
    }
    else{
      const db = getFirestore();
      var listadoDB = [];
      const articulosRef = query(
        collection(db, "catalogo"),
        limit(cantidad)
      );
      await getDocs(articulosRef).then((articulo)=>{
        listadoDB = articulo.docs.map((doc)=>({id: doc.idCategoria, ...doc.data()}))
      })
      var articulosListaRecomendados = await crearArticulos(listadoDB);
    return articulosListaRecomendados;
    } 
  }
  const context = {
    articulosLoaded,
    articulosListadoDB,
    setArticulosLoaded,
    obtenerItemPorID,
    cargarArticulos,
    obtenerItemsPorCategoria,
    obtenerArticulosPorCantidad
  }
  return (
    <ArticulosContext.Provider value={context}>
      {children}
    </ArticulosContext.Provider>
  )

}
export {useArticulos, ArticulosProvider}