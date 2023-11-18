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
  const [type, setType] = useState(null);
  const [qualification, setQualification] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [filters, setFilters] = useState(false);
  let {categoryId} = useParams();
  const previousCategoryId = useRef();


  useEffect(() => {
    const handleFiltering = (allServices) => {
      let services = allServices.filter((service) => service.published)
      if(type !== null){
        services = services.filter((service) => (service.type === type))
      }
      if(qualification !== null){
        services = services.filter((service) => (service.qualification === qualification))
      }
      if(frequency !== null){
        services = services.filter((service) => (service.frequency === frequency))
      }
      return services
    }
    const setItemsByCategory = async () => {
      if(categoryId !== undefined){
        setFilters(true);
        let categoryFound = await (obtenerCategoriaPorID(categoryId));
        let services = await obtenerServiciosPorCategoria(categoryFound.id);
        setCategoria(categoryFound);
        services = handleFiltering(services);
        setItemsCategory(services);
      }
      else
      {
        let services = handleFiltering(serviciosListadoDB);
        setItemsCategory(services);
      }
      setItemsLoaded(true);
    }
    if(!itemsLoaded || previousCategoryId.current !== categoryId){
      previousCategoryId.current = categoryId
      setItemsByCategory();
    }
  }, [itemsLoaded, categoryId, categoria, itemsCategory, obtenerCategoriaPorID, 
    obtenerServiciosPorCategoria, serviciosListadoDB, qualification, frequency, type, filters]); 
  
    const checkFilters = (qualification, frequency, type, categoria) => {
      if(qualification === null && frequency === null && type === null && categoria === null){
        setFilters(false);
      }
    }

  const filterByQualification = (event, rate) => {
    event.preventDefault();
    setQualification(rate);
    setFilters(true);
    setItemsLoaded(false);
  }
  const removeQualificationFilter = (event) => {
    event.preventDefault();
    setQualification(null);
    checkFilters(null, frequency, type, categoria);
    setItemsLoaded(false);
  }
  const filterByFrequency = (event, frequency) => {
    event.preventDefault();
    setFrequency(frequency);
    setFilters(true);
    setItemsLoaded(false);
  }
  const removeFrequencyFilter = (event) => {
    event.preventDefault();
    setFrequency(null);
    checkFilters(qualification, null, type, categoria);
    setItemsLoaded(false);
  }
  const filterByType = (event, type) => {
    event.preventDefault();
    setType(type);
    setFilters(true);
    setItemsLoaded(false);
  }
  const removeTypeFilter = (event) => {
    event.preventDefault();
    setType(null);
    checkFilters(qualification, frequency, null, categoria);
    setItemsLoaded(false);
  }
  const removeCategoryFilter = (event) => {
    event.preventDefault();
    checkFilters(qualification, frequency, type, null);
    setItemsLoaded(false);
  }
  const restartFiltering = (event) => {
    event.preventDefault();
    setType(null);
    setQualification(null);
    setFrequency(null);
    setFilters(false);
    setItemsLoaded(false);
  }
  return (
    <main>
      <div id="catalog">
        <div>
          {(filters === true) &&  
          <div id="sideBar">
            <div className="category">
              <span onClick={(e) => restartFiltering(e)} >
                <Link className="noDecoration" to={"/category/"}>Remover filtros</Link>
              </span>
            </div>
            <div className="category">
              <span>Filtros</span>
              <div className="subCategory">
            {(qualification !== null) &&
              <span style={{ cursor: 'pointer' }} onClick={(e) => removeQualificationFilter(e)}>{(qualification === 1) ? "1 estrella" : qualification+" estrellas"}</span>
            }
            {(qualification !== null) &&
              <br/>
            }
            {(frequency !== null) &&              
              <span style={{ cursor: 'pointer' }} onClick={(e) => removeFrequencyFilter(e)}>{frequency}</span>
            }
            {(frequency !== null) &&
              <br/>
            }
            {(type !== null) &&
              <span style={{ cursor: 'pointer' }} onClick={(e) => removeTypeFilter(e)}>{type}</span>
            }
            {(type !== null) &&
              <br/>
            }
            {(categoria !== null) &&
              <span onClick={(e) => removeCategoryFilter(e)}><Link className="noDecoration" to={"/category/"}>{categoria.name}</Link></span>
            }{(categoria !== undefined) &&
              <br/>
            }
            </div>
            </div>
          </div>
          }
        <div id="sideBar">
          <div className="category">
            <span onClick={(e) => restartFiltering(e)} >
              <Link className="noDecoration" to={"/category/"}>Todos</Link>
            </span>
          </div>
          {(qualification === null) &&
            <div className="category">
              <span>Calificación</span>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByQualification(e, 1)}>1 estrella</span></div>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByQualification(e, 2)}>2 estrellas</span></div>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByQualification(e, 3)}>3 estrellas</span></div>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByQualification(e, 4)}>4 estrellas</span></div>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByQualification(e, 5)}>5 estrellas</span></div>
            </div>
          }
          {(qualification === null) &&
            <br/>
          }
          {(frequency === null) &&
            <div className="category">
              <span>Frecuencia</span>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByFrequency(e, "Única")}>Única</span></div>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByFrequency(e, "Semanal")}>Semanal</span></div>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByFrequency(e, "Mensual")}>Mensual</span></div>
            </div>
          }
          {(frequency === null) &&
            <br/>
          }
          {(type === null) &&
            <div className="category">
              <span>Tipo</span>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByType(e, "Individual")}>Individual</span></div>
              <div className="subCategory"><span style={{ cursor: 'pointer' }} onClick={(e) => filterByType(e, "Grupal")}>Grupal</span></div>
            </div>
          }
          {(type === null) &&
            <br/>
          }
          {(categoryId === undefined) &&
            <div className="category">
              <span>Categoria</span>
              { categoriasListadoDB.map((category) => (
                <div key={category.id} className="subCategory">
                  <span>
                    <Link className="noDecoration" to={"/category/"+category.id}>{category.name}</Link>
                  </span>
                </div>
              ))
              }
            </div>
          }
        </div>
        </div>
        
        <div id="elementsList">
          { (itemsCategory.length !== 0) ? (itemsCategory.map((item) => (
            <div key={item.id}>
              <ServicioListed servicio={item}/>
              <br/>
            </div>
          )))
          :
          (
          <div className="service">
            <h2>No se encontraron servicios con el filtrado seleccionado</h2>
            <h4>Puedes comenzar la busqueda nuevamente dando al filtrado de Todos!</h4>
            <br/>
          </div>
          )
          }
        </div>
        
      </div>
      <hr />
    </main>
  )
}

export default CategoryItems