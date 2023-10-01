import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItemRecommended = (props) => {
    const [servicio, setServicio] = useState({});
    const [image, setImage] = useState("");
    const URLPage = "/ItemPage/1"/*+servicio.id*/;
    useEffect(() => {
        setServicio(props.servicio);
        if(image === ""){
            try{
                setImage(require("../../images/services/"+props.servicio.image));
            }
            catch{
                setImage(require("../../images/services/default.jpg"));
            }
        }
      },[image, props.servicio])
    return (
        <Link to={URLPage} className="noDecoration" >
            <div className="itemDiv recommendedItem">
                <img src= {image} alt=""/>
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