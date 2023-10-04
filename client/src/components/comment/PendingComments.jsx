import React from "react"
import { Divider, Avatar, Grid, Paper, TextareaAutosize } from "@mui/material";
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

const PendingComments = (serviceComments) => {
    const { usuario, instantiateUser, updateUser} = useUsuario();
    const isLoggedIn = !(usuario === null);
    const [comments, setComments] = useState(serviceComments);
    const [filteredComments, setFilteredComments] = useState([])
    useEffect(() => {
            let allComments = []
            allComments = allComments.filter(comment => comment.reviewed == false)
            console.log(allComments)
            setFilteredComments(allComments)
    }, [comments])
    return <div style={{justifyContent: "center", alignContent: "center"}}>
        <Paper style={{ padding: "40px 20px", flexDirection:"row" }}>
        <h3>Comentarios Pendientes</h3>
        <h3></h3>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" stickyHeader sx={{tableLayout:"fix"}}>
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="left">Message</TableCell>
                        <TableCell align="right">Qualification</TableCell>
                        <TableCell align="right">Accion</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredComments.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell align="right">{row.user}</TableCell>
                        <TableCell sx={{wordBreak:"break-word", maxWidth: "300px"}} align="left">
                            <p>{row.message}</p>
                        </TableCell>
                        <TableCell align="right">{row.qualification}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
    </div>
}

export default PendingComments
