import React from 'react';
import Service from './Service';
import { useUsuario } from './UserContext';
import { useServicios } from '../service/ServiciosContext';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './style.scss';
import ModalServiceForm from '../servicePage/ModalServiceForm';
import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';
import PendingComments from '../comment/PendingComments';

const Services = () => {
    const { usuario } = useUsuario();
    const { obtenerServiciosPorResponsable, guardarServicio, actualizarServicio } = useServicios();
    const isLoggedIn = !(usuario === null);
    const [services, setServices] = useState([]);
    const [comprasListadas, setComprasListadas] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState({})
    const [comments, setComments] = useState([])
    const [pendingCommentsServiceId, setPendingCommentsServiceId] = useState("")
    const [edicion, setEdicion] = useState(false)
    const [show, setShow] = useState(false);
    const [onSave, setOnSave] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAllServicesFromUser = async () => {
        let listadoDB = await obtenerServiciosPorResponsable(usuario.id);
        setServices(listadoDB);
        setComprasListadas(true);
    }

    useEffect(() => {
        if (isLoggedIn && !comprasListadas){
            getAllServicesFromUser();
        }
    }, [services, isLoggedIn, comprasListadas, usuario, obtenerServiciosPorResponsable])

    const onCreateService = (newService) => {
        console.log("voy a crear")
        newService.responsible = usuario.id
        guardarServicio(newService)
    }

    const onEditService = (updatedService) => {
        console.log("voy a editar")
        actualizarServicio(updatedService)
    }

    const openForEdit = (service) =>{
        handleShow()
        setServiceToEdit(service)
        setEdicion(true)
    }

    const openForCreation = () =>{
        setServiceToEdit({})
        setEdicion(false)
        handleShow() 
    }

    const onPendingComments = (service) =>{
        setPendingCommentsServiceId(service.id)
        setComments(service.comments)
        console.log(pendingCommentsServiceId)
    }

    const onDeleteService = (servicio) => {
        console.log("servicio a borrar : ")
        console.log(servicio)
    }

    const renderServices = () => {
        if(services.length == 0) {
            return <div className="service">
                <h2>No tienes servicios creados</h2>
                <h4>Puedes comenzar a publicitar tus servicios hoy mismo !</h4>
                <br/>
            </div>
        }
        return <div style={{padding: "2%"}}>
            <TableContainer>
                <Table aria-label="simple table" stickyHeader sx={{tableLayout:"fix"}}>
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Titulo</TableCell>
                        <TableCell align="center">Descripcion</TableCell>
                        <TableCell align="right">Frecuencia</TableCell>
                        <TableCell align="right">Calificacion</TableCell>
                        <TableCell align="right">Tipo</TableCell>
                        <TableCell align="right">Categorias</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {services.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell sx={{wordBreak:"break-word", maxWidth: "300px"}} align="left">
                            <p>{row.description}</p>
                        </TableCell>
                        <TableCell align="right">{row.frequency}</TableCell>
                        <TableCell align="right">{row.qualification}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">Historia</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="center">
                            <div style={{flexDirection:"row", display:"flex"}}>
                                <Tooltip aria-label="Bold" title="Editar">
                                    <IconButton size="medium" onClick={() => openForEdit(row)}>
                                        <EditIcon></EditIcon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip aria-label="Bold" title="Borrar">
                                    <IconButton size="medium" onClick={() => onDeleteService(row)}>
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip aria-label="Bold" title="Comentarios">
                                    <IconButton size="medium" onClick={() => onPendingComments(row)}>
                                        <CommentIcon></CommentIcon>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }

    return (
        <main>
            <div className="containerServices">
                <div className="servicesDiv">
                    <h3>
                        Desde aqui puedes ver y gestionar tus servicios
                    </h3>
                    {(!isLoggedIn) && <Navigate to="/"/> }
                    {renderServices()}
                    <div className="buttonElementContainer">
                        <button type="button" onClick={openForCreation} className="btn btn-outline-dark botonAgregarCarrito">Crear nuevo servicio</button>
                    </div>
                    <ModalServiceForm show={show} onHide={handleClose} service={serviceToEdit} edicion={edicion} onSave={edicion ? onEditService : onCreateService}/>  
                </div>
            </div>
            <div className="containerServices">
            <div className='servicesDiv'>
                    <PendingComments serviceComments={comments} serviceId={pendingCommentsServiceId}></PendingComments>
                </div>
            </div>
        <hr />
        </main>
    )
}


export default Services