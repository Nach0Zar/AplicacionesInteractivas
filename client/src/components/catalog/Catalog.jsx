import React from 'react';
import ItemListed from '../listing/ItemListed';
import { Link } from 'react-router-dom';
import { useArticulos } from '../listing/ItemsContext';

const Catalog = () => {
  const { articulosListadoDB } = useArticulos();
  
    return (
      <main>
        <div id="catalogo">
            <div id="barraLateral">
                <div className="categoria">
                    <span>Descuentos</span>
                    <div className="subCategoria"><span>5% OFF</span></div>
                    <div className="subCategoria"><span>10% OFF</span></div>
                    <div className="subCategoria"><span>15% OFF</span></div>
                </div>
                <br/>
                <div className="categoria">
                    <span>Ubicacion</span>
                    <div className="subCategoria"><span>Argentina</span></div>
                    <div className="subCategoria"><span>Brasil</span></div>
                    <div className="subCategoria"><span>Chile</span></div>
                    <div className="subCategoria"><span>Colombia</span></div>
                </div>
                <br/>
                <div className="categoria">
                    <span>Condicion</span>
                    <div className="subCategoria"><span>Nuevo</span></div>
                    <div className="subCategoria"><span>Usado</span></div>
                </div>
                <br/>
                <div className="categoria">
                    <span>Tipo</span>
                    <div className="subCategoria"><span><Link className="noDecoration" to="/ecommerce-frontend/category/0">Cosmeticos</Link></span></div>
                    <div className="subCategoria"><span><Link className="noDecoration" to="/ecommerce-frontend/category/1">Electrónica</Link></span></div>
                    <div className="subCategoria"><span><Link className="noDecoration" to="/ecommerce-frontend/category/2">Alimentos</Link></span></div>
                    <div className="subCategoria"><span><Link className="noDecoration" to="/ecommerce-frontend/category/3">Escolares</Link></span></div>
                    <div className="subCategoria"><span><Link className="noDecoration" to="/ecommerce-frontend/category/4">Domestico</Link></span></div>
                </div>
            </div>
            <div id="listaDeObjetos">
            { articulosListadoDB.map((item) => (
                <div key={item.id}> 
                  <ItemListed key={item.id} articulo={item}/>
                  <br/>
                </div>
            ))
            }
            </div>
        </div>
      </main>
  )
}

export default Catalog
