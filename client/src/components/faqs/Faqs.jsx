import React from 'react'
import './style.scss'

const Faqs = () => {
  return (
    <main>
      <div className="faqsContainer">
        <div className="preguntaDiv">
            <h3>¿Cómo puedo comprar?</h3>
            <p>Para comprar productos, es necesario primero registrarse en la página o, en caso de ya contar con una cuenta, loguearse. Una vez dentro de la cuenta, iremos al buscador a elegir el elemento que deseamos adquirir. Al comprar el elemento, deberemos elegir método de pago y domicilio del comprador.</p>    
        </div>
        <div className="preguntaDiv">
            <h3>¿Puedo comprar items de otro pais?</h3>
            <p>En Zona Compra contamos con una licencia en los paises miembro del MERCOSUR para el libre traspaso de mercadería. Una compra dentro del mismo pais en el que se encuentra el vendedor y el comprador tiene un aproximado de 15 días hábiles. Para compras entre diferentes paises, el estimado de envío está entre 20 a 30 días hábiles desde que se efectua la compra.</p>    
        </div>
        <div className="preguntaDiv">
            <h3>No me llegó un item o quiero cancelar la compra, ¿Con quien puedo hablar?</h3>
            <p>Zona Compra cuenta con múltiples centros de soporte y ayuda al consumidor vía telefónica. Además, cuenta con un chat interactivo desde la página para realizar cancelaciones previas a las 24horas de hecha la compra sin ningún tipo de costo. Pasadas esas 24 horas, se deberá hablar con el soporte para coordinar las acciones a tomar y se devolverá la totalidad o una parcialidad de la compra. </p>    
        </div>
      </div>  
      <hr />
    </main>
    
  )
}

export default Faqs