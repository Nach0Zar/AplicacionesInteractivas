import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const ItemListed = (props) => {
    var articulo = props.articulo;
    const URLPage = "/ecommerce-frontend/ItemPage/"+articulo.id;
     
  return (
    <Link to={URLPage} className="noDecoration">
        <div className="item">
            <div className="imageContainer">
                <img src={articulo.imgSrc} alt=""/>
            </div>
            <div className="textButtonContainer">
                <div className="textContainer">
                    <div className="priceTitleContainer">
                        <h4 className="nameElement">{articulo.nombreArticulo}</h4>
                        <h5 className="priceElement">${articulo.precio}</h5>
                    </div>
                    <p className="descriptionElement">{articulo.descripcion}</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ItemListed