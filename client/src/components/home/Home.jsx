import React from 'react';
import ItemListContainerRecommended from './ItemListContainerRecommended';
import Slider from './Slider';
import './style.scss';

const Home = () => {
  return (
    <div>
        <Slider/>
        <ItemListContainerRecommended/>
    </div>
  )
}

export default Home