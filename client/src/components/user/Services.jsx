import React from 'react';
import Service from './Service';
import { useUsuario } from './UserContext';
import { useServicios } from '../service/ServiciosContext';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './style.scss';

const Services = () => {
    const { usuario } = useUsuario();
    const { obtenerServiciosPorResponsable } = useServicios();
    const isLoggedIn = !(usuario === null);
    const [services, setServices] = useState([]);
    const [comprasListadas, setComprasListadas] = useState(false);
    useEffect(() => {
        const getAllServicesFromUser = async () => {
            let listadoDB = await obtenerServiciosPorResponsable(usuario.id);
            setServices(listadoDB);
            setComprasListadas(true);
        }
        if (isLoggedIn && !comprasListadas){
            getAllServicesFromUser();
        }
    }, [services, isLoggedIn, comprasListadas, usuario, obtenerServiciosPorResponsable])
    return (
        <main>
            <div className="containerServices">
                <div className="servicesDiv">
                    {(!isLoggedIn) && <Navigate to="/"/> }
                    {services.length > 0 ? 
                    services.map((service, index, array)=>{
                        if(index+1 === array.length){
                            return <div key={service.id} >
                                <Service service={service}/>
                                <br />
                            </div>
                        }
                        else{
                            return <div key={service.id} >
                                <Service service={service}/>
                                <hr/>
                            </div>
                        }
                    })
                    :
                    <div className="service">
                        <h2>No tienes servicios creados</h2>
                        <h4>Puedes comenzar a publicitar tus servicios hoy mismo !</h4>
                        <br/>
                    </div>
                    }
                </div>
            </div>
        <hr />
        </main>
    )
}


export default Services