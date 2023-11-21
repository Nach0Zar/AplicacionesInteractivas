import React from "react"
import { Divider, Avatar, Grid, Paper, TextareaAutosize } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import DoneIcon from '@mui/icons-material/Done';

const Comment = ({comment, onSave, editMode}) => {
    
    const onSubmit = (e) => {
        e.preventDefault()
        const { user, message, qualification } = e.target.elements
        let conFom = {
          user: user.value,
          message: message.value,
          qualification: qualification.value,
        }
        onSave(conFom)
        user.value = ""
        message.value = ""
        qualification.value = 0
      }

    const renderComment = (comment, editMode) => {
        if (editMode == false) {
            let ratingValue = comment.qualification
            return <div style={{marginTop: "1%", marginLeft: "1%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "0%", backgroundColor: "ghostwhite"}}>
                <div>
                    <Rating precision={0.5} readOnly value={ratingValue}/>
                    <h4 style={{ margin: 0, textAlign: "left", paddingRight: "2%"}}>{comment.user}</h4>
                </div>
                <p style={{ textAlign: "left" }}>{comment.message}</p>
                <div style={{flexDirection: "row", justifyContent:"space-evenly", width:"25%"}}>
                </div>
            </div>
        } else {
            return <div>
                <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "0%"}}>
                    <Rating precision={0.5} style={{marginBottom: "2%"}} name="qualification"/>
                    <TextField id="outlined-basic" label="Nombre" variant="outlined" style={{marginBottom: "2%", width: "50%"}} name="user"/>
                    <TextareaAutosize minRows="3" id="outlined-basic" label="Comentario" variant="outlined" style={{marginBottom: "2%", width: "50%"}} name="message"/>
                    <Button variant="contained" color="success" type="submit">Enviar</Button>
                </form>
            </div>                
        }
    }

    return (
        <main>
            <Grid justifyContent="left" item xs zeroMinWidth style={{paddingBottom: "2%"}}>
                {renderComment(comment, editMode)}
            </Grid>
        </main>
    )
}

export default Comment