import React from 'react';
import Order from './Order';
import { collection, getDocs, getFirestore, query, where, doc } from "firebase/firestore";
import { useUsuario } from './UserContext';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './style.scss';

const Orders = () => {
    const { usuario } = useUsuario();
    const isLoggedIn = !(usuario === null);
    const [compras, setCompras] = useState([])
    const [comprasListadas, setComprasListadas] = useState(false)
    useEffect(() => {
        const db = getFirestore();
        const getAllOrdersFromUser = async () => {
            const usuarioDoc = doc(db, "usuarios", usuario.nombreUsuario);
            const comprasRef = query(
                collection(db, "compras"),
                where("usuario", "==", usuarioDoc)
            );
            var listadoDB;
            await getDocs(comprasRef).then((compra)=>{
                listadoDB = compra.docs.map((doc)=>({id: doc.id, ...doc.data()}))
              })
            setCompras(listadoDB)
            setComprasListadas(true);
        }
        if (isLoggedIn && !comprasListadas){
            getAllOrdersFromUser()
        }
    }, [compras, isLoggedIn, comprasListadas, usuario])
    return (
        <main>
            <div className="containerOrders">
                <div className="ordersDiv">
                    {(!isLoggedIn) && <Navigate to="/ecommerce-frontend/"/> }
                    {compras.length > 0 ? 
                    compras.map((compra, index, array)=>{
                        if(index+1 === array.length){
                            return <div>
                                <Order key={compra.id} compra={compra}/>
                                <br />
                            </div>
                        }
                        else{
                            return <div>
                                <Order key={compra.id} compra={compra}/>
                                <hr/>
                            </div>
                        }
                    })
                    :
                    <div className="order">
                        <h2>No tienes compras realizadas</h2>
                        <h4>Puedes comenzar a comprar hoy mismo !</h4>
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