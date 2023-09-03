import React from 'react';
import { useState } from 'react';
import { useCart } from '../cart/CartContext';
import { useUsuario } from '../user/UserContext';
import swal from 'sweetalert';

const ItemCount = (props) => {
  const itemId = props.id;
  const [counterItem, setCounterItem] = useState(1);
  const { addItem } = useCart();
  const { usuario } = useUsuario();
  const handleAddItemOnClick = () => {
    (counterItem!==props.stock) ? setCounterItem(counterItem+1) : swal("Stock","No quedan unidades en stock disponible", "info")
  }

    const handleSubstractItemOnClick = () => {
      (counterItem>1) && (setCounterItem(counterItem-1));
    }
    const addToCartHandler = () => {
      if(!(usuario === null)){
        addItem(itemId,counterItem);
      }
      else{
        swal("Usuario no logueado", "Debes estar logueado para poder agregar articulos a tu carrito!", "warning");
      }
    }
    
  return (
    <div className="containerQtyButton">
      <div className="containerQuantity">
          <div className="input-group w-auto align-items-center">
              <input type="button" value="-" className="buttonQty" onClick={handleSubstractItemOnClick}/>
              <div className="itemQuantity">{counterItem}</div>
              <input type="button" value="+" className="buttonQty" onClick={handleAddItemOnClick}/>
          </div>
      </div>
      <div className="containerQuantity">
        <div className="input-group w-auto align-items-center">
            <button type="button" className="btn btn-outline-dark" onClick={addToCartHandler}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  )
}

export default ItemCount