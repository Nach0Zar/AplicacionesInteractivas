import React from "react"
import { Divider, Avatar, Grid, Paper, TextareaAutosize, Tooltip, IconButton } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import DoneIcon from '@mui/icons-material/Done';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import { useServicios } from '../service/ServiciosContext';
import { useUsuario } from '../user/UserContext';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const PendingComments = (props) => {
    const { usuario, instantiateUser, updateUser} = useUsuario();
    const { reviewComentario } = useServicios();
    const isLoggedIn = !(usuario === null);
    const [filteredComments, setFilteredComments] = useState([])
    const [commentServiceId, setCommentServiceId] = useState()
    useEffect(() => {
            let serviceComments = props.serviceComments
            let serviceId = props.serviceId
            console.log("dentro del effect, " + serviceId)
            console.log(serviceComments)
            let allComments = serviceComments !== null ? serviceComments : []
            allComments = serviceComments.filter(comment => comment.reviewed == false)
            setFilteredComments(allComments)
            setCommentServiceId(serviceId)
    }, [props.serviceComments, props.serviceId])

    const handleAccept = (comment) => {
        console.log(commentServiceId)
        const req = {
            accepted: true
        }
        reviewComentario(req, commentServiceId, comment.id)
    }

    const handleBlock = (comment) => {
        const req = {
            accepted: false
        }
        reviewComentario(req, commentServiceId, comment.id)
    }
    
    return <div style={{justifyContent: "center", alignContent: "center"}}>
        <Paper style={{ padding: "40px 20px", flexDirection:"row" }}>
        <h3>Comentarios Pendientes</h3>
        <h3></h3>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" stickyHeader sx={{tableLayout:"fix"}}>
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Comentario</TableCell>
                        <TableCell align="center">Calificacion</TableCell>
                        <TableCell align="center">Accion</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody placeholder="No hay comentarios">
                    {filteredComments.map((comment) => (
                        <TableRow key={comment.id}>
                        <TableCell align="right">{comment.user}</TableCell>
                        <TableCell sx={{wordBreak:"break-word", maxWidth: "500px"}} align="left">
                            <p>{comment.message}</p>
                        </TableCell>
                        <TableCell align="right">{comment.qualification}</TableCell>
                        <TableCell align="center">
                            <div style={{flexDirection:"row", display:"flex"}}>
                                <Tooltip aria-label="Bold" title="Aceptar">
                                    <IconButton size="medium" onClick={() => handleAccept(comment)}>
                                        <CheckIcon color="success"></CheckIcon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip aria-label="Bold" title="Rechazar">
                                    <IconButton size="medium" onClick={() => handleBlock(comment)}>
                                        <CloseIcon color="error"></CloseIcon>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
    </div>
}

export default PendingComments
