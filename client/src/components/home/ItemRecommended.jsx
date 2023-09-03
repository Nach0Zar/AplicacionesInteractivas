import React from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';

const ItemRecommended = (props) => {
    var articulo = props.articulo;
    const URLPage = "/ecommerce-frontend/ItemPage/"+articulo.id;
    return (
        <div className="itemDiv recommendedItem">
            <Link to={URLPage} className="noDecoration" >
                <img src= {articulo.imgSrc} alt=""/>
            </Link>
            <hr/>
            <span>${articulo.precio}</span>
            <ItemCount id={articulo.id} stock = {articulo.stock} cantidad = {articulo.cantidad}/>
        </div>
    )
}

export default ItemRecommended