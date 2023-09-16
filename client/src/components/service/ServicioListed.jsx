import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const ServiceListed = (props) => {
    var servicio = props.servicio;
    const URLPage = "/Service/"+servicio.id;
     
  return (
    <Link to={URLPage} className="noDecoration">
        <div className="item">
            <div className="imageContainer">
                <img src={servicio.imgSrc} alt=""/>
            </div>
            <div className="textButtonContainer">
                <div className="textContainer">
                    <div className="priceTitleContainer">
                        <h4 className="nameElement">{servicio.nombreServicio}</h4>
                        <h5 className="priceElement">${servicio.precio}</h5>
                    </div>
                    <p className="descriptionElement">{servicio.descripcion}</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ServiceListed