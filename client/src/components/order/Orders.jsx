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
    const [orders, setOrders] = useState([])
    const [ordersListadas, setOrdersListadas] = useState(false)
    useEffect(() => {
        const getAllOrdersFromUser = async () => {
            let listadoDB = await getOrders();
            setOrders(listadoDB);
            setOrdersListadas(true);
        }
        if (isLoggedIn && !ordersListadas){
            getAllOrdersFromUser()
        }
    }, [orders, isLoggedIn, ordersListadas, usuario, getOrders])
    return (
        <main>
            <div className="containerOrders">
                <div className="ordersDiv">
                    {(!isLoggedIn) && <Navigate to="/"/> }
                    {orders.length > 0 ? 
                    orders.map((compra, index, array)=>{
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