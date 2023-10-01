import React from 'react'
import ItemRecommended from './ItemRecommended';
import { useState, useEffect } from 'react';
import { useServicios } from '../service/ServiciosContext';

const ItemListRecommended = () => {

    const [items, setItems] = useState([]);
    const [itemsLoaded, setItemsLoaded] = useState(false);
    const { obtenerServiciosPorCantidad } = useServicios();


    useEffect(() => {
        const setServices = async () => {
            await obtenerServiciosPorCantidad(4)
            .then((data)=>{
                setItems(data);
                setItemsLoaded(true);
            }).catch((err)=>
                console.log(err)
            );
        }
        if(itemsLoaded === false){
            setServices()
        }
    }, [items, obtenerServiciosPorCantidad, itemsLoaded]);

    return (
        <div id="recommendations">
            {(itemsLoaded === true) 
            && items.map((item) => (
                <ItemRecommended key={item.id} servicio={item}/>
            ))
            }
        </div>
    )
}

export default ItemListRecommended