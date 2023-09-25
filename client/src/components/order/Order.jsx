import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import { useOrder } from './OrderContext';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

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
    console.log("triggered")
    if(!listedOrder){
      setOrder(props.order);
      setOrderStatus(props.order.status)
      setListedOrder(true);
    }
  }, [listedOrder, order, props.order, orderStatus])
  
  return (
    <div className="order">
      <h2>ID de orden: {order.id}</h2>
      <h4>Fecha de orden: {order.timestamp}</h4>
      <h4>Nombre y apellido del solicitante: {order.applicant.name} {order.applicant.lastname}</h4>
      <h4>Email del solicitante: {order.applicant.email}</h4>
      <h4>Telefono del solicitante: {order.applicant.phone}</h4>
      <h4>Mensaje: {order.message}</h4>
      <h4>Status: {orderStatus}</h4>
      <div className="container orderButtons">
        <ThemeProvider theme={theme}>
          {(orderStatus === "requested") && (<Button variant="contained" color="success" onClick={(e) => handleChangeStatus(e, "approved")}>Aceptar</Button>)
          }
          {(orderStatus === "approved") && (<Button variant="contained" color="violet" onClick={(e) => handleChangeStatus(e, "done")}>Finalizar</Button>)
          }
          {(orderStatus === "requested") && (<Button variant="contained" color="error" onClick={(e) => handleChangeStatus(e, "cancelled")}>Cancelar</Button>)}
          
        </ThemeProvider>  
      </div>
    </div>
  )
}
export default Order