import React from 'react';
import ItemListRecommended from './ItemListRecommended';

const ItemListContainerRecommended = () => { 
  return (
    <div>
        <div id="recommendedContainer">
            <hr/>
            <h2>Recomendados</h2>
              <ItemListRecommended/>
        </div>
        <br/>
        <hr/>
    </div>
  )
}

export default ItemListContainerRecommended