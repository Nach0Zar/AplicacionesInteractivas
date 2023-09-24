import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { CategoryProvider } from './components/category/CategoryContext';
import { ArticulosProvider } from './components/listing/ItemsContext';
import { ServiciosProvider } from './components/service/ServiciosContext';
import { CartProvider } from './components/cart/CartContext';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJpTaAWNzBmw_EmX1LpcO-FKjDuQZLF5o",
  authDomain: "coderhousereact-nach0zar.firebaseapp.com",
  projectId: "coderhousereact-nach0zar",
  storageBucket: "coderhousereact-nach0zar.appspot.com",
  messagingSenderId: "1009660668998",
  appId: "1:1009660668998:web:b50c327712e3c45d3eae47"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <CategoryProvider>
      <ServiciosProvider>
        <ArticulosProvider>
            <App />
        </ArticulosProvider>
      </ServiciosProvider>
    </CategoryProvider>
  </CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
