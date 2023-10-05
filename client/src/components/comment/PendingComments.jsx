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

const PendingComments = (serviceComments) => {
    const { usuario, instantiateUser, updateUser} = useUsuario();
    const isLoggedIn = !(usuario === null);
    const [comments, setComments] = useState(serviceComments);
    const [filteredComments, setFilteredComments] = useState([])
    useEffect(() => {
            let allComments = []
            allComments = serviceComments.comments.filter(comment => comment.reviewed == false)
            setFilteredComments(allComments)
    }, [serviceComments])

    const handleAccept = (comment) => {

    }

    const handleBlock = (comment) => {

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
                    {filteredComments.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell align="right">{row.user}</TableCell>
                        <TableCell sx={{wordBreak:"break-word", maxWidth: "500px"}} align="left">
                            <p>{row.message}</p>
                        </TableCell>
                        <TableCell align="right">{row.qualification}</TableCell>
                        <TableCell align="center">
                            <div style={{flexDirection:"row", display:"flex"}}>
                                <Tooltip aria-label="Bold" title="Aceptar">
                                    <IconButton size="medium" onClick={() => handleAccept(row)}>
                                        <CheckIcon color="success"></CheckIcon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip aria-label="Bold" title="Rechazar">
                                    <IconButton size="medium" onClick={() => handleBlock(row)}>
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
