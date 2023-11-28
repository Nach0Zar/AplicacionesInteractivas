import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
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
  const [orderStatus, setOrderStatus] = useState(null);
  const [listedOrder, setListedOrder] = useState(false);
  const {updateOrderStatus} = useOrder();
  
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
      swal("Orden modificada!", "La orden " + order.id + " fue cambiada al estado " + status, "success");
    }
    else{
      swal("Orden no modificada", "Desafortunadamente, hubo un problema con la página. Por favor, intentar nuevamente en unos instantes.", "error");
    }
    let newOrder = order;
    newOrder.status = status;
    setOrder(newOrder);
    setOrderStatus(status)
  }
  
  
  useEffect(() => {
    if(!listedOrder){
      setOrder(props.order);
      setOrderStatus(props.order.status)
      setListedOrder(true);
    }
  }, [listedOrder, order, props.order, orderStatus])
  
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
          {(orderStatus === "requested") && (<Button variant="contained" color="success" onClick={(e) => handleChangeStatus(e, "approved")}>Aceptar</Button>)
          }
          {(orderStatus === "approved") && (<Button variant="contained" color="violet" onClick={(e) => handleChangeStatus(e, "done")}>Finalizar</Button>)
          }
          {(orderStatus === "requested" || orderStatus === "approved") && (<Button variant="contained" color="error" onClick={(e) => handleChangeStatus(e, "cancelled")}>Cancelar</Button>)}
          
        </ThemeProvider>  
      </div>
      </TableCell>
    </TableRow>
  )
}
export default Order