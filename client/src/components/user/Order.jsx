import React from 'react';
import { useState, useEffect } from 'react';
import { useArticulos } from '../listing/ItemsContext';
import ItemListadoOrder from './ItemListadoOrder';

const Order = (props) => {
  const compra = props.compra;
  const [listadoItems, setListadoItems] = useState([]);
  const [listadoCargado, setListadoCargado] = useState(false);
  const { articulosListadoDB } = useArticulos();
  useEffect(() => {
    const cargarItemsListado = async () => {
      var listadoItems = [];   
      var cantidades = [];
      compra.cantidades.forEach((item)=> (
        cantidades.push(item))
      );
      compra.items.forEach((item, index) => {
        var indexArticulo = articulosListadoDB.map((e)=>{ return e.id; }).indexOf(parseInt(item.id));
        var articuloEncontrado = articulosListadoDB[indexArticulo];
        var itemListado = {
          idItem: item.id,
          nombreItem: articuloEncontrado.nombreArticulo,
          cantidadItem: cantidades[index]
        }
        listadoItems.push(itemListado)
    });
    setListadoItems(listadoItems)
    setListadoCargado(true);
    }
    if(!listadoCargado) {
      cargarItemsListado();
    }
  }, [listadoCargado, articulosListadoDB, compra])
  

  const date = new Date(compra.date * 1000);
  const datevalues = [
    date.getUTCFullYear()-1969,
    date.getUTCMonth()+1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  
  return (
    <div className="order">
      <h2>ID de compra: {compra.id}</h2>
      <h4>Fecha de compra: {datevalues[0]}, {datevalues[1]}, {datevalues[2]}</h4>
      {listadoItems.map((item) => (
        <div key={item.id}>
          <ItemListadoOrder key={item.id} item={item}/>
        </div>  
      ))}
      <h4>Total de compra: {compra.total}</h4>
    </div>
  )
}
export default Order