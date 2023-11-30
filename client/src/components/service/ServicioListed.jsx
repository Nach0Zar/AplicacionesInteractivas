import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useServicios } from '../service/ServiciosContext';
import './style.scss';
import Rating from '@mui/material/Rating';

const ServiceListed = (props) => {
    const [image, setImage] = useState("");
    const [servicio, setServicio] = useState({});
    const {cargarImagen} = useServicios();
    const URLPage = "/service/"+servicio.id;
    const altImage = require("../../images/services/default.jpg");
    useEffect(() => {
        setServicio(props.servicio);
        if(image === ""){
            cargarImagen(props.servicio.image).then(file => {
                setImage(file)
            })
        }
        },[image, props.servicio])
    const setAltImage = (e) => {
        e.preventDefault();
        setImage(altImage);
    }
    return (
        <Link to={URLPage} className="noDecoration">
            <div className="item">
                <div className="imageContainer">
                    <img src={image} alt="" onError={(e) => {setAltImage(e)}}/>
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