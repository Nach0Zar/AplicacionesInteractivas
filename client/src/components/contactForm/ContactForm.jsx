import React from "react"
import { FormControl, FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

const ContactForm = () => {
    return (
        <FormControl>
            <div style={{justifyContent:"space-between", display:"flex", flexDirection: "row"}}>
                <TextField type="text" label="Telefono"/>
                <TextField type="text" label="Email" />
                <TextField type="text" label="Horario de referencia"/>
            </div>
        </FormControl>
    )
}

export default ContactForm