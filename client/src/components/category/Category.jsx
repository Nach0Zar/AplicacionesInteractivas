import React from 'react';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ItemListed from '../listing/ItemListed';
import { Link } from 'react-router-dom';
import { useArticulos } from '../listing/ItemsContext';
import { useCategorias } from './CategoryContext';
import './style.scss';

const CategoryItems = () => {
const { articulosListadoDB, obtenerItemsPorCategoria } = useArticulos();
const { obtenerCategoriaPorID } = useCategorias();
const [itemsCategory, setItemsCategory] = useState([]);
var {categoryId} = useParams();
(categoryId===undefined) && (categoryId = -1);
useEffect(() => {
  

    const getCategoryByID = new Promise((resolve) => {

      if(categoryId>-1){
        resolve(obtenerCategoriaPorID(categoryId));
      }
      else
      {
        setItemsCategory(articulosListadoDB)
      }
      
    })

    getCategoryByID.then((data)=> {
      const getItemsByCategoryID = new Promise((resolve) => {
        resolve(obtenerItemsPorCategoria(data));
      });
      getItemsByCategoryID.then((data)=> {setItemsCategory(data)})
      .catch((err)=>console.log(err));
    
    }).catch((data)=>{
      data.then((result)=>setItemsCategory(result))
      });
    }, [categoryId]);

  return (
    <main>
      <div id="catalog">
          <div id="sideBar">
              <div className="category">
                  <span>Descuentos</span>
                  <div className="subCategory"><span>5% OFF</span></div>
                  <div className="subCategory"><span>10% OFF</span></div>
                  <div className="subCategory"><span>15% OFF</span></div>
              </div>
              <br/>
              <div className="category">
                  <span>Ubicacion</span>
                  <div className="subCategory"><span>Argentina</span></div>
                  <div className="subCategory"><span>Brasil</span></div>
                  <div className="subCategory"><span>Chile</span></div>
                  <div className="subCategory"><span>Colombia</span></div>
              </div>
              <br/>
              <div className="category">
                  <span>Condicion</span>
                  <div className="subCategory"><span>Nuevo</span></div>
                  <div className="subCategory"><span>Usado</span></div>
              </div>
              <br/>
              <div className="category">
                  <span>Tipo</span>
                  <div className="subCategory"><span><Link className="noDecoration" to="/ecommerce-frontend/category/0">Cosmeticos</Link></span></div>
                  <div className="subCategory"><span><Link className="noDecoration" to="/ecommerce-frontend/category/1">Electrónica</Link></span></div>
                  <div className="subCategory"><span><Link className="noDecoration" to="/ecommerce-frontend/category/2">Alimentos</Link></span></div>
                  <div className="subCategory"><span><Link className="noDecoration" to="/ecommerce-frontend/category/3">Escolares</Link></span></div>
                  <div className="subCategory"><span><Link className="noDecoration" to="/ecommerce-frontend/category/4">Domestico</Link></span></div>
              </div>
          </div>
          <div id="elementsList">
          { itemsCategory.map((item) => (
              <div key={item.id}>
                <ItemListed articulo={item}/>
                <br/>
              </div>
          ))
          }
          </div>
      </div>
      <hr />
    </main>
  )
}

export default CategoryItems