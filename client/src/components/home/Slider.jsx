import React from 'react'
import { ReactComponent as Logo } from '../../images/undraw_educator_re_ju47.svg';

const Slider = () => {
  return (
    <div id="containerSlide">
        <h2>Bienvenido a tu plataforma de aprendizaje!</h2>
        <div id="slideshow">
            {/* <ul>
                <li id="slide">
                    <img src="https://neilpatel.com/wp-content/uploads/2015/04/ecommerce.jpg" alt=""/>
                </li>
                <li id="slide">
                    <img src="https://d1ih8jugeo2m5m.cloudfront.net/2021/06/Ecommerce-Thumbnail.jpg" alt=""/>
                </li>  
                <li id="slide">
                    <img src="https://auren.com/ar/wp-content/uploads/2020/11/e.commerce1-1030x578-1.jpg" alt=""/>
                </li>
            </ul> */}
            <Logo style={{width: "inherit", height: "inherit"}}/>
        </div>
    </div>
  )
}

export default Slider