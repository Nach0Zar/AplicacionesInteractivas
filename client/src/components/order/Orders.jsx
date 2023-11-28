import React from 'react';
import Order from './Order';
import { useUsuario } from '../user/UserContext.jsx';
import { useOrder } from './OrderContext.jsx'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
            console.log(listadoDB)
        }
        if (isLoggedIn && !ordersListadas){
            getAllOrdersFromUser()
        }
    }, [orders, isLoggedIn, ordersListadas, usuario, getOrders])

    const renderOrders = () => {
        {console.log("rendering")}
        return <div style={{padding: "2%"}}>
            <TableContainer>
                <Table aria-label="simple table" stickyHeader sx={{tableLayout:"fix"}}>
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Fecha de orden</TableCell>
                        <TableCell align="center">Servicio solicitado</TableCell>
                        <TableCell align="center">Estado actual</TableCell>
                        <TableCell align="right">Email del solicitante</TableCell>
                        <TableCell align="right">DNI del solicitante</TableCell>
                        <TableCell align="right">Telefono del solicitante</TableCell>
                        <TableCell align="center">Mensaje</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {(orders.length > 0) ? 
                        orders.map((row) => (
                            <Order order={row}></Order>
                        )) : (<TableRow>
                            <TableCell align="center">No hay ordenes creados!</TableCell>
                        </TableRow>)
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }

    return (
        <div className="containerServices">
        <div className="servicesDiv">
            <h3>
                Desde aqui puedes ver y gestionar tus ordenes
            </h3>
            {renderOrders()}
        </div>
    </div>
        // <main>
        //     <div className="containerOrders">
        //         <div className="ordersDiv">
        //             {(!isLoggedIn) && <Navigate to="/"/> }
        //             {orders.length > 0 ? 
        //             orders.map((compra, index, array)=>{
        //                 if(index+1 === array.length){
        //                     return <div key={compra.id}>
        //                         <Order order={compra}/>
        //                         <br />
        //                     </div>
        //                 }
        //                 else{
        //                     return <div key={compra.id}>
        //                         <Order order={compra}/>
        //                         <hr/>
        //                     </div>
        //                 }
        //             })
        //             :
        //             <div className="order">
        //                 <h2>No recibiste ordenes aun!</h2>
        //                 <h4>Cuando alguien desee adquirir un servicio tuyo aparecera aqui</h4>
        //                 <br/>
        //             </div>
        //             }
        //         </div>
        //     </div>
        // <hr />
        // </main>
    )
}


export default Orders