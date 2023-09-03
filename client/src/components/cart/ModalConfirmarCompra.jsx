import React from 'react';
import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useUsuario } from '../user/UserContext';
import { Usuario } from '../imports/classes';
import { setDoc, getFirestore, serverTimestamp , doc, getDoc, updateDoc } from "firebase/firestore";
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const ModalConfirmarCompra = (props) => {
    let navigate = useNavigate();
    const costoTotal = props.costoTotal;
    const show = props.show;
    const handleClose = props.onHide;
    const [creditCard, setCreditCard] = useState('');
    const [codigoSeguridad, setCodigoSeguridad] = useState('');
    const [fechaVto, setFechaVto] = useState('');
    const [usuarioDatos, setUsuarioDatos] = useState('');
    const { usuario } = useUsuario();
    const { articulos, clearItems } = useCart();

    useEffect(() => {
        if(usuario === null){
            setUsuarioDatos(new Usuario("nombreUsuario", "", "", "ejemplo@test.com", "12345678", "1111111111"));
        }
        else{
            setUsuarioDatos(usuario);
        }
    }, [usuario])

    function calcularCuotas(cuotas){
        return (costoTotal)/(cuotas);
    }
    const handleChangeFechaVto = (e) => {
        setFechaVto(e.target.value);
    }
    const handleChangeCreditcard = (e) => {
        setCreditCard(e.target.value.slice(0,e.target.maxLength));
    }
    const handleChangeCodigoSeguridad = (e) => {
        setCodigoSeguridad(e.target.value.slice(0,e.target.maxLength));
    }
    const realizarCompra = async (e) => {
        let inputElements = document.querySelectorAll("input");
        let cuotas;
        let correctCard = false;
        let correctCode = false;
        let correctDate = false;
        let correctNameCard = false;
        inputElements.forEach(function(input) {
            switch(input.name){
                case 'cuotas':
                    if(input.checked){
                        cuotas = input.value;
                    }
                    break;
                case 'creditCard':
                    if(input.value.toString().length === input.maxLength){
                        correctCard = true;
                    }
                    break;
                case 'cardCode':
                    if(input.value.toString().length === input.maxLength){
                        correctCode = true;
                    }
                    break;
                case 'cardDate':
                    if(input.value.toString().length !== 0){
                        correctDate = true;
                    }
                    break;
                case 'nombreTitular':
                    if(input.value.toString().length !== 0){
                        correctNameCard = true;
                    }
                    break;
                default:
                    break;
            }
        });
        if (correctCard && correctCode && correctDate && correctNameCard){
            const db = getFirestore();
            const usuarioDoc = doc(db, "usuarios", usuarioDatos.id);
            let listadoDocs = [];
            let cantidadesItems = [];
            articulos.forEach(articulo => {
                let articuloDoc = doc(db, "catalogo", articulo.id.toString());
                listadoDocs.push(articuloDoc);
                cantidadesItems.push(articulo.cantidad);
            });
            const compra = {
                usuario: usuarioDoc,
                items: listadoDocs,
                date: serverTimestamp(),
                cantidades: cantidadesItems,
                total: costoTotal
            }
            let yourDate = new Date();
            function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
              }
            const compraID = usuarioDatos.id+"-"+yourDate.getFullYear()+"-"+padTo2Digits(yourDate.getMonth() + 1)+"-"+padTo2Digits(yourDate.getDay() +2)+"-"+padTo2Digits(yourDate.getHours())+"-"+padTo2Digits(yourDate.getMinutes())+"-"+padTo2Digits(yourDate.getSeconds());
            await setDoc(doc(db, "compras", compraID), compra)
            .then(()=> {
                articulos.forEach(articulo => {
                    let articuloDoc = doc(db, "catalogo", articulo.id.toString());
                    getDoc(articuloDoc).then((data)=>{
                        let newStock = data.data().stock - articulo.cantidad;
                        updateDoc(articuloDoc, {
                            stock: newStock
                        });
                    })
                });
                clearItems();
                swal("Compra realizada!", "El valor total fue divido en "+ cuotas + " cuotas de $" + calcularCuotas(parseInt(cuotas)) + " cada una, ya que el valor total es de $" + costoTotal, "success");
            }).catch(()=>{
                swal("Compra no realizada", "Desafortunadamente, hubo un problema con la página. Por favor, intentar nuevamente en unos instantes.", "error");
            });
            handleClose();
            navigate("/ecommerce-frontend");
        }
        else{
            swal("Información errónea", "Los datos de pago son incorrectos. Por favor, revisar e intentar nuevamente.", "error");
        }
    }
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Realizar compra</Modal.Title>
        </Modal.Header>
        <form className="form-horizontal" onSubmit={(e)=>{e.preventDefault()}}>
            <Modal.Body>
            <div className="centered">
                <p>¿Estas a punto de finalizar tu compra, estás seguro de querer hacerlo?</p>
                <p>Confirmar que su información de contacto es la correcta. De no ser asi, modificarla desde su perfil.</p>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                        <input type="text" className="form-control" placeholder="Nombre de Usuario" name="username" readOnly="readOnly" defaultValue={usuarioDatos.nombreUsuario}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Mail de contacto</span>
                            </div>
                        <input type="email" className="form-control" placeholder="Mail del usuario" name="email" readOnly="readOnly" defaultValue={usuarioDatos.email}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">DNI</span>
                            </div>
                        <input type="text" className="form-control" placeholder="DNI del usuario" name="dni" readOnly="readOnly" defaultValue={usuarioDatos.dni}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Telefono</span>
                            </div>
                        <input type="text" className="form-control" placeholder="Telefono del usuario" name="telefono" readOnly="readOnly" defaultValue={usuarioDatos.telefono}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Tarjeta del usuario</span>
                            </div>
                        <input type="number" className="form-control" name="creditCard" minLength={16} maxLength={16} value={creditCard} onChange={handleChangeCreditcard} placeholder="XXXXXXXXXXXXXXXX" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Fecha de Vto.</span>
                            </div>
                            <input type="month" name="cardDate" className="form-control" value={fechaVto} onChange={handleChangeFechaVto} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Codigo de seguridad</span>
                            </div>
                            <input type="number" minLength={4} maxLength={4} name="cardCode" value={codigoSeguridad} onChange={handleChangeCodigoSeguridad} className="form-control" placeholder="XXXX" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Titular</span>
                            </div>
                        <input type="text" className="form-control" name="nombreTitular" placeholder="Nombre Apellido" required/>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="input-group mb-1">
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="radio" name="cuotas" aria-label="Radio button for following text input" value="1" defaultChecked="checked"/>
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with radio button" placeholder="1 Cuota sin interés" readOnly="readOnly" disabled/>
                        </div>
                        <div className="input-group mb-1">
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="radio" name="cuotas" aria-label="Radio button for following text input" value="3"/>
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with radio button" placeholder="3 Cuotas sin interés" readOnly="readOnly" disabled/>
                        </div>
                        
                        <div className="input-group mb-1">
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="radio" name="cuotas" aria-label="Radio button for following text input" value="6"/>
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with radio button" placeholder="6 Cuotas sin interés" readOnly="readOnly" disabled/>
                        </div>
                        <div className="input-group">
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" type="radio" name="cuotas" aria-label="Radio button for following text input" value="12"/>
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with radio button" placeholder="12 Cuotas sin interés" readOnly="readOnly" disabled/>
                        </div>
                    </div>
                <p>El monto a pagar por los servicios totales es de <strong>${costoTotal}</strong></p>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancelar Compra</button>
                <button type="submit" className="btn btn-outline-secondary" name="comprar" id="realizarCompra" value="Submit" onClick={realizarCompra}>Realizar Compra</button>
            </Modal.Footer>
            </form>
        </Modal>
    </>
  )
}

export default ModalConfirmarCompra