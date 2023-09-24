import React from 'react';
import { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import ServicioListed from '../service/ServicioListed';
import { Link } from 'react-router-dom';
import { useServicios } from '../service/ServiciosContext';
import { useCategorias } from './CategoryContext';
import './style.scss';

const CategoryItems = () => {
  const { serviciosListadoDB, obtenerServiciosPorCategoria } = useServicios();
  const { categoriasListadoDB, obtenerCategoriaPorID } = useCategorias();
  const [itemsCategory, setItemsCategory] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  let {categoryId} = useParams();
  const previousCategoryId = useRef();
  (categoryId===undefined) && (categoryId = -1);
  useEffect(() => {
    const setItemsByCategory = async () => {
      if(categoryId !== -1){
        let categoryFound = await (obtenerCategoriaPorID(categoryId));
        let services = await obtenerServiciosPorCategoria(categoryFound.id);
        setCategoria(categoryFound);
        setItemsCategory(services);
      }
      else
      {
        setItemsCategory(serviciosListadoDB);
      }
      setItemsLoaded(true);
    }
    if(!itemsLoaded || previousCategoryId.current !== categoryId){
      previousCategoryId.current = categoryId
      setItemsByCategory();
    }
  }, [itemsLoaded, categoryId, categoria, setCategoria, itemsCategory, setItemsCategory, obtenerCategoriaPorID, obtenerServiciosPorCategoria, serviciosListadoDB]);
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
                  { categoriasListadoDB.map((category) => (
                    <div key={category.id} className="subCategory">
                      <span>
                        <Link className="noDecoration" to={"/category/"+category.id}>{category.name}</Link>
                        </span>
                      </div>
                  ))
                  }
              </div>
          </div>
          <div id="elementsList">
          { itemsCategory.map((item) => (
              <div key={item.id}>
                <ServicioListed servicio={item}/>
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