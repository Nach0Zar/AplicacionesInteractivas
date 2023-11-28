import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItemRecommended = (props) => {
    const [servicio, setServicio] = useState({});
    const [image, setImage] = useState("");
    const URLPage = "/service/"+servicio.id;
    const altImage = require("../../images/services/default.jpg");
    useEffect(() => {
        setServicio(props.servicio);
        setImage(props.servicio.image)
        if(image != ""){
            setImage(props.servicio.image);
        }
    },[props.servicio.image, props.servicio])
    const setAltImage = (e) => {
        e.preventDefault();
        setImage(altImage);
    }
    return (
        <Link to={URLPage} className="noDecoration" >
            <div className="itemDiv recommendedItem">
                <img src= {image} alt="" onError={(e) => {setAltImage(e)}}/>
                <hr/>
                <span>{servicio.name}</span>
                <span>${servicio.price}</span>
                <div className="containerQtyButton">
                    <div className="containerQuantity">
                        <div className="input-group w-auto align-items-center">
                            <button type="button" className="btn btn-outline-dark">Adquirir servicio</button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItemRecommended