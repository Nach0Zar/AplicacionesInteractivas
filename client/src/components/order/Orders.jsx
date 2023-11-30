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
import TablePagination from "@mui/material/TablePagination"; 
import { Navigate } from 'react-router-dom';
import './style.scss';

const Orders = () => {
    const { usuario } = useUsuario();
    const { getOrders } = useOrder();
    const isLoggedIn = !(usuario === null);
    const [orders, setOrders] = useState([])
    const [ordersListadas, setOrdersListadas] = useState(false)
    const [pg, setpg] = useState(0); 
  
    function handleChangePage(event, newpage) { 
        setpg(newpage); 
    } 
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
                        orders.slice(pg * 5, pg * 5 + 5).map((row) => (
                            <Order order={row}></Order>
                        )) : (<TableRow>
                            <TableCell align="center">En este momento no tienes contratacion!</TableCell>
                        </TableRow>)
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                component="div"
                count={orders.length} 
                rowsPerPage={5} 
                page={pg}
                labelRowsPerPage= ''
                rowsPerPageOptions={[]}
                onPageChange={handleChangePage} 
            /> 
        </div>
    }

    return (
        <div className="containerServices">
        <div className="servicesDiv">
            <h3>
                Desde aqui puedes ver y gestionar tus contrataciones
            </h3>
            {renderOrders()}
        </div>
    </div>
    )
}


export default Orders