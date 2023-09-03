import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useArticulos } from '../listing/ItemsContext';

const CartContext = React.createContext([]);

  const useCart = () => {
    return useContext(CartContext);
  }

  const CartProvider = ({defaultValue = [], children}) => {
    
    const { obtenerItemPorID } = useArticulos();
    const [articulos, setArticulos] = useState(defaultValue);
    const [changes, setChanges] = useState(0);
    const [costoSubTotal, setCostoSubTotal] = useState(0);

    useEffect(() => {
      let subTotalCarrito = 0;
        articulos.forEach((item)=>{
          subTotalCarrito += (item.precio*item.cantidad);
        })
        setCostoSubTotal(subTotalCarrito);
    }, [articulos, changes])
    
    const addItem = async (item, quantity) => {
      if(!isInCart(item)){
        await obtenerItemPorID(item).then(
          (articuloObtenido) => {
            if(quantity <= articuloObtenido.stock){
              articuloObtenido.cantidad += quantity;
            }
            setArticulos(prevState => {
              return prevState.concat(articuloObtenido);
            })
          }

        );
      }

      else{
        articulos.forEach(articulo => {
          if(articulo.id === item ){
            if(quantity <= articulo.stock){
              articulo.cantidad += quantity;
            }
          }
        });
      }
      
      setChanges(changes+1);
    }

    const clearItems = () => {
      setArticulos([]);
      setChanges(changes+1);
    }

    const isInCart = (item) => {
      let foundInCart = false;
      articulos.forEach(articulo => {
        if(articulo.id === item ){
          foundInCart = true;
        }
      });
      return foundInCart;
    }

    const removeItem = (item) => {
      let indiceArticulo = -1;
      articulos.forEach(function callback(value, index) {
        if(value.id === item ){
          indiceArticulo = index
        }
      });
      if (indiceArticulo !== -1){
        articulos.splice(indiceArticulo,1);
      }
      setChanges(changes+1);
    }

    const setItemQuantity = (item, quantity) => {
      articulos.forEach(articulo => {
        if(articulo.id === item && quantity <= articulo.stock){
          articulo.cantidad = quantity;
        }
      });
      setChanges(changes+1);
    }

    const context = {
      articulos,
      costoSubTotal,
      addItem,
      clearItems,
      removeItem,
      isInCart,
      setItemQuantity
    }
    
  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  )

}
export {useCart, CartProvider}