import React from 'react'
import ItemRecommended from './ItemRecommended';
import { useState, useEffect } from 'react';
import { useArticulos } from '../listing/ItemsContext';

const ItemListRecommended = () => {

    const [items, setItems] = useState([]);
    const { obtenerArticulosPorCantidad } = useArticulos();

    useEffect(() => {

        const promise = new Promise((resolve) => {
            resolve(obtenerArticulosPorCantidad(4))
        })

        promise.then((data)=>{setItems(data);}).catch((err)=>console.log(err));
    }, []);

  return (
    <div id="recommendations">
        {items.map((item) => (
            <ItemRecommended key={item.id} articulo={item}/>
        ))
        }
    </div>
  )
}

export default ItemListRecommended