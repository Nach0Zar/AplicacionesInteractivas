import React from 'react';
import Order from './Order';
import { useUsuario } from '../user/UserContext.jsx';
import { useOrder } from './OrderContext.jsx'
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './style.scss';

const Orders = () => {
    const { usuario } = useUsuario();
    const { getOrders } = useOrder();
    const isLoggedIn = !(usuario === null);
    const [compras, setCompras] = useState([])
    const [comprasListadas, setComprasListadas] = useState(false)
    useEffect(() => {
        const getAllOrdersFromUser = async () => {
            let listadoDB = await getOrders();
            setCompras(listadoDB);
            setComprasListadas(true);
        }
        if (isLoggedIn && !comprasListadas){
            getAllOrdersFromUser()
        }
    }, [compras, isLoggedIn, comprasListadas, usuario, getOrders])
    return (
        <main>
            <div className="containerOrders">
                <div className="ordersDiv">
                    {(!isLoggedIn) && <Navigate to="/"/> }
                    {compras.length > 0 ? 
                    compras.map((compra, index, array)=>{
                        if(index+1 === array.length){
                            return <div key={compra.id}>
                                <Order order={compra}/>
                                <br />
                            </div>
                        }
                        else{
                            return <div key={compra.id}>
                                <Order order={compra}/>
                                <hr/>
                            </div>
                        }
                    })
                    :
                    <div className="order">
                        <h2>No recibiste ordenes aun!</h2>
                        <h4>Cuando alguien desee adquirir un servicio tuyo aparecera aqui</h4>
                        <br/>
                    </div>
                    }
                </div>
            </div>
        <hr />
        </main>
    )
}


export default Orders