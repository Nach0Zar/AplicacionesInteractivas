import { Error } from "../error/error.js";

export default function userDataValidation({email, password, name, lastname, phone}) {
    if(name === ""){
        throw new Error(`The user name can not be empty.`, 'BAD_REQUEST')
    }
    if(email === ""){
        throw new Error(`The user email can not be empty.`, 'BAD_REQUEST')
    }
    if(password === ""){
        throw new Error(`The user password can not be empty.`, 'BAD_REQUEST')
    }
    if(phone === ""){
        throw new Error(`The user phone can not be empty.`, 'BAD_REQUEST')
    }
    if(lastname === ""){
        throw new Error(`The user lastname can not be empty.`, 'BAD_REQUEST')
    }
}