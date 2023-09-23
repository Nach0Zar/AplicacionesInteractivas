import './App.css';
import Footer from './components/main/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import ItemPage from './components/itemPage/ItemPage';
import CategoryItems from './components/category/Category';
import Header from './components/main/Header';
import { CartProvider } from './components/cart/CartContext';
import { useEffect } from 'react';
import LoadingComponent from './components/main/LoadingComponent';
import { useArticulos } from './components/listing/ItemsContext';
import { useCategorias } from './components/category/CategoryContext';
import { useServicios } from './components/service/ServiciosContext';
import Register from './components/register/Register';
import Login from './components/user/Login';
import { UsuarioProvider } from './components/user/UserContext';
import Profile from './components/user/Profile';
import Faqs from './components/faqs/Faqs';
import About from './components/about/About';
import Services from './components/user/Services';
import ServicePage from './components/servicePage/servicePage';


function App() {
  const { articulosLoaded, cargarArticulos } = useArticulos();
  const { serviciosLoaded, cargarServicios } = useServicios();
  const { categoriasLoaded, cargarCategorias } = useCategorias();

  useEffect(() => {
    if(!articulosLoaded){
      let promise = new Promise((resolve) => {
        resolve(cargarArticulos())
    })
    promise.then()
    .catch((err)=>console.log(err));
    }
    else{
      if(!categoriasLoaded){
        let promise = new Promise((resolve) => {
          resolve(cargarCategorias())
      })
      promise.then()
      .catch((err)=>console.log(err));
      }
    }
    
    if(!serviciosLoaded){
      let promise = new Promise((resolve) => {
        resolve(cargarServicios())
    })
    promise.then()
    .catch((err)=>console.log(err));
    }
    else{
      if(!categoriasLoaded){
        let promise = new Promise((resolve) => {
          resolve(cargarCategorias())
      })
      promise.then()
      .catch((err)=>console.log(err));
      }
    }
  }, [articulosLoaded, categoriasLoaded, serviciosLoaded, cargarArticulos, cargarCategorias, cargarServicios])

if(!articulosLoaded || !categoriasLoaded){ 
  return(<LoadingComponent />)} 
else
  return (
    <BrowserRouter>
    <CartProvider>
      <UsuarioProvider>
        <Header/>
        <Routes>
          <Route exact path="/" element={ <Home />} />
          <Route exact path="/" element={ <Home />} />
          <Route path="/service/:serviceID" element={ <ServicePage />} />
          <Route path="/itemPage/:itemId" element={ <ItemPage />} />
          <Route path="/category" element={ <CategoryItems />}/>
          <Route path="/category/:categoryId" element={ <CategoryItems />}/>
          <Route exact path="/register" element={ <Register />}/>
          <Route exact path="/login" element={ <Login />}/>
          <Route exact path="/user" element={ <Profile />}/>
          <Route exact path="/faqs" element={ <Faqs />}/>
          <Route exact path="/about" element={ <About />}/>
          <Route exact path="/services" element={ <Services />}/>
        </Routes>
        <Footer/>
      </UsuarioProvider>
    </CartProvider>
  </BrowserRouter>
  );
}

export default App;
