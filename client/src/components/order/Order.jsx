import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import { IconButton, Paper, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useOrder } from './OrderContext';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Order = (props) => {
  const [order, setOrder] = useState(props.order);
  const [orderID, setOrderID] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [listedOrder, setListedOrder] = useState(false);
  const {updateOrderStatus} = useOrder();

  const solicitado = "Solicitado"
  const cancelado = "Cancelado"
  const aceptado = "Aceptado"
  const finalizado = "Finalizado"
  
  const theme = createTheme({
    palette: {
      violet: {
        main: alpha('#7F00FF', 0.9),
        contrastText: getContrastRatio(alpha('#7F00FF', 0.9), '#fff') > 4.5 ? '#fff' : '#111',
      },
    },
  });
  const handleChangeStatus = async(e, status) => {
    e.preventDefault();
    let modified = await updateOrderStatus(order.id, status);
    if(modified){
      swal("Contratacion modificada!", "La contratacion fue cambiada al estado " + status, "success");
    }
    else{
      swal("Contratacion no modificada", "Desafortunadamente, hubo un problema con la página. Por favor, intentar nuevamente en unos instantes.", "error");
    }
    let newOrder = order;
    newOrder.status = status;
    setOrder(newOrder);
    setOrderStatus(status)
  }
  
  
  useEffect(() => {
    if(!listedOrder || orderID != props.orderID){
      setOrderID(props.orderID)
      setOrder(props.order);
      setOrderStatus(props.order.status)
      setListedOrder(true);
    }
  }, [listedOrder, order, props.order, orderStatus, props.orderID, orderID])
  
  return (
    <TableRow key={order.id}>
      <TableCell align="right">
          {order.timestamp}
      </TableCell>
      <TableCell align="right">
          {order.service.name}
      </TableCell>
      <TableCell align="right">
          {order.status}
      </TableCell>
      <TableCell align="right">
          {order.applicant.email}
      </TableCell>
      <TableCell align="right">
          {order.applicant.dni}
      </TableCell>
      <TableCell align="right">
          {order.applicant.phone}
      </TableCell>
      <TableCell sx={{wordBreak:"break-word", maxWidth: "300px"}} align="left">
          <p>{order.message}</p>
      </TableCell>
      <TableCell>
      <div className="container orderButtons">
        <ThemeProvider theme={theme}>
          {
            (orderStatus === solicitado) && (
            <Tooltip aria-label="Bold" title="Aceptar contratacion">
              <IconButton size="medium" onClick={(e) => handleChangeStatus(e, aceptado)}>
                  <DoneIcon color="success"></DoneIcon>
              </IconButton>
            </Tooltip>
            )
          }
          {
            (orderStatus === aceptado) && (
              <Tooltip aria-label="Bold" title="Finalizar contratacion">
              <IconButton size="medium" onClick={(e) => handleChangeStatus(e, finalizado)}>
                  <DoneAllIcon color="violet"></DoneAllIcon>
              </IconButton>
            </Tooltip>
              )
          }
          {
            (orderStatus === solicitado || orderStatus === aceptado) && (
              <Tooltip aria-label="Bold" title="Cancelar contratacion">
                <IconButton size="medium" onClick={(e) => handleChangeStatus(e, cancelado)}>
                  <DeleteIcon color='error'></DeleteIcon>
                </IconButton>
              </Tooltip>
            )
          }
          {
            (orderStatus === cancelado || orderStatus === finalizado) && (<p>No hay acciones disponibles</p>)
          }

        </ThemeProvider>  
      </div>
      </TableCell>
    </TableRow>
  )
}
export default Order