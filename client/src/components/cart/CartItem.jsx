import React from 'react';
import { useCart } from './CartContext';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';

const CartItem = (props) => {
    let articulo = props.articulo;
    const [counterItem, setCounterItem] = useState(articulo.cantidad);
    const { setItemQuantity, removeItem } = useCart();
    
    const handleAddItemOnClick = () => {
        (counterItem < articulo.stock) ? setCounterItem(articulo.cantidad+1) : swal("Stock","No quedan unidades en stock disponible","info")
      }
    
    const handleSubstractItemOnClick = () => {
        if(counterItem>1) {
            setCounterItem(articulo.cantidad-1)};
    }
    const removeFromCartHandler = () => {
        removeItem(articulo.id);
      }
    useEffect(() => {
        setItemQuantity(articulo.id,counterItem);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counterItem,articulo.id])
      
  return (
    <div className="itemCart" key={articulo.id}>
        <div className="imageContainer">
            <img src={articulo.imgSrc} alt=""/>
        </div>
        <div className="buttonTextContainerCart">
            <div className="textContainerCartItem">
                <div className="textContainerCartItem">
                    <h4 className="nameElement">{articulo.nombreArticulo}</h4>
                    <h5 className="priceElement">${articulo.precio}</h5>
                </div>
            </div>
            <div className="buttonQtyCartConteiner">
                <div className="buttonsCentered">
                    <div className="containerCantidadBotones">
                        <div className="input-group w-auto align-items-center">
                            <input type="button" value="-" className="buttonQty" onClick={handleSubstractItemOnClick}/>
                            <div className="itemQuantity">{counterItem}</div>
                            <input type="button" value="+" className="buttonQty" onClick={handleAddItemOnClick}/>
                        </div>
                    </div>
                </div>   
                <div className="deleteItemButtonContainer">
                    <div className="buttonContainer">
                        <button type="button" className="btn btn-outline-dark" onClick={removeFromCartHandler}>Quitar Articulo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem