import React from 'react';
import { useContext, useState } from 'react';
import { Order } from '../imports/classes';

const OrderContext = React.createContext([]);
  

  const useOrder = () => {
    return useContext(OrderContext);
  }

  const OrderProvider = ({defaultValue = null, children}) => {
    
    const [orders, setOrders] = useState([]);

    const instantiateOrder = (order) => {
      return new Order(order);
    }

    const crearOrders = async (listadoDB) => {
      var ordersLista = [];
      listadoDB.forEach((order)=>{
        const orderObjeto = instantiateOrder(order);
        ordersLista.push(orderObjeto);
      })
      return ordersLista;
    }

    const getOrders = async () => {
      return await fetch("http://localhost:8080/api/orders", {
        credentials: 'include'
      }).then(async (data) => {
        if((data.ok)){
          let jsonData = await data.json();
          let orders = crearOrders(jsonData);
          setOrders(orders);
          return orders;
        }
        return orders;
      }).catch((err) => {
        console.log(err);
        return orders; //esto va a funcionar como un cache. Si falla el get method, devuelvo data "vieja"
      })
    }

    const createOrder = async (order) => {
      return await fetch("http://localhost:8080/api/orders", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        credentials: 'include',
        body: JSON.stringify(order)
      }).then(async (response) => {
        if(!(response.ok)){
          return false;
        }
        return true;
      }).catch((err)=>{
        console.log("Order registration validation failed with error: "+err);
        return null;
      })
    }

    const updateOrderStatus = async (orderID, newStatus) => {
      return await fetch("http://localhost:8080/api/orders/"+orderID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        credentials: 'include',
        body: JSON.stringify({status: newStatus})
      }).then(async (response) => {
        if(!(response.ok)){
          return false;
        }
        return true;
      }).catch((err)=>{
        console.log("Order modification validation failed with error: "+err);
        return null;
      })
    }
    
    const context = {
      orders,
      getOrders,
      createOrder,
      updateOrderStatus
    }
    
  return (
    <OrderContext.Provider value={context}>
      {children}
    </OrderContext.Provider>
  )

}
export {useOrder, OrderProvider}