import './App.css';
import Footer from './components/main/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import ItemPage from './components/itemPage/ItemPage';
import CategoryItems from './components/category/Category';
import Cart from './components/cart/Cart';
import Header from './components/main/Header';
import { CartProvider } from './components/cart/CartContext';
import { useEffect } from 'react';
import LoadingComponent from './components/main/LoadingComponent';
import { useArticulos } from './components/listing/ItemsContext';
import { useCategorias } from './components/category/CategoryContext';
import Register from './components/register/Register';
import Login from './components/user/Login';
import { UsuarioProvider } from './components/user/UserContext';
import Profile from './components/user/Profile';
import Faqs from './components/faqs/Faqs';
import About from './components/about/About';
import Orders from './components/user/Orders';


function App() {
  const { articulosLoaded, cargarArticulos } = useArticulos();
  const { categoriasLoaded, cargarCategorias } = useCategorias();

  useEffect(() => {
    if(!articulosLoaded){
      const promise = new Promise((resolve) => {
        resolve(cargarArticulos())
    })
    promise.then()
    .catch((err)=>console.log(err));
    }
    else{
      if(!categoriasLoaded){
        const promise = new Promise((resolve) => {
          resolve(cargarCategorias())
      })
      promise.then()
      .catch((err)=>console.log(err));
      }
    }
  }, [articulosLoaded, categoriasLoaded, cargarArticulos, cargarCategorias])

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
          <Route exact path="/ecommerce-frontend/" element={ <Home />} />
          <Route path="/ecommerce-frontend/itemPage/:itemId" element={ <ItemPage />} />
          <Route path="/ecommerce-frontend/category" element={ <CategoryItems />}/>
          <Route path="/ecommerce-frontend/category/:categoryId" element={ <CategoryItems />}/>
          <Route exact path="/ecommerce-frontend/cart" element={ <Cart />}/>
          <Route exact path="/ecommerce-frontend/register" element={ <Register />}/>
          <Route exact path="/ecommerce-frontend/login" element={ <Login />}/>
          <Route exact path="/ecommerce-frontend/user" element={ <Profile />}/>
          <Route exact path="/ecommerce-frontend/faqs" element={ <Faqs />}/>
          <Route exact path="/ecommerce-frontend/about" element={ <About />}/>
          <Route exact path="/ecommerce-frontend/orders" element={ <Orders />}/>
        </Routes>
        <Footer/>
      </UsuarioProvider>
    </CartProvider>
  </BrowserRouter>
  );
}

export default App;
