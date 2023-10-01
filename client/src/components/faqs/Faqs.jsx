import React from 'react'
import './style.scss'

const Faqs = () => {
  return (
    <main>
      <div className="faqsContainer">
        <div className="preguntaDiv">
            <h3>¿Cómo puedo comprar?</h3>
            <p>Para adquirir servicios, es necesario contar con un email y un telefono de contacto. Una vez enviada la solicitud, cada proveedor de servicio podra analizar la peticion y se pondra en contacto via email/telefono para coordinar los pasos a seguir.</p>    
        </div>
        <div className="preguntaDiv">
            <h3>¿Puedo comprar servicios de otro pais?</h3>
            <p>En Cursera contamos con una licencia en los paises miembro del MERCOSUR para el libre comercio de servicios.</p>    
        </div>
        <div className="preguntaDiv">
            <h3>Quiero proveer mis propios servicios, ¿Como puedo hacerlo?</h3>
            <p>Cursera se enfoca en la facilidad a la hora de usar la pagina. Solo necesitas registrarte y llenar la informacion solicitada. Luego, desde tu perfil, deberas llenar informacion como el titulo y experiencia del proveedor. A continuacion, se podra crear cualquier tipo de servicio y ya podra estar a la espera de nuevos clientes.</p>    
        </div>
        <div className="preguntaDiv">
            <h3>Estoy teniendo problemas tecnicos en la pagina, ¿Con quien puedo hablar?</h3>
            <p>Cirsera cuenta con múltiples centros de soporte y ayuda al consumidor vía telefónica. Además, cuenta con un chat interactivo desde la página para realizar cancelaciones previas a las 24 horas de hecha la compra sin ningún tipo de costo. Pasadas esas 24 horas, se deberá hablar con el soporte para coordinar las acciones a tomar y se devolverá la totalidad o una parcialidad de la compra.</p>    
        </div>
      </div>  
      <hr />
    </main>
    
  )
}

export default Faqs