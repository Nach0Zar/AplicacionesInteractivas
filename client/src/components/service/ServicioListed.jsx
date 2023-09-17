import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const ServiceListed = (props) => {
    const [image, setImage] = useState("");
    const [servicio, setServicio] = useState({});
    const URLPage = "/service/"+servicio.id;
    useEffect(() => {
        
        setServicio(props.servicio);
        if(image === ""){
            const logo = require("../../images/services/"+props.servicio.image)
            setImage(logo);
        }
      },[image, props.servicio])
        
  return (
    <Link to={URLPage} className="noDecoration">
        <div className="item">
            <div className="imageContainer">
                <img src={image} alt=""/>
            </div>
            <div className="textButtonContainer">
                <div className="textContainer">
                    <div className="priceTitleContainer">
                        <h4 className="nameElement">{servicio.name}</h4>
                        <h5 className="priceElement">${servicio.price}</h5>
                    </div>
                    <p className="descriptionElement">{servicio.description}</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ServiceListed