import { Error } from "../error/error.js";

export default function applicantDataValidation({email, time, name, lastname, phone}) {
    if(name === ""){
        throw new Error(`The applicant name can not be empty.`, 'BAD_REQUEST')
    }
    if(email === ""){
        throw new Error(`The applicant email can not be empty.`, 'BAD_REQUEST')
    }
    if(time === ""){
        throw new Error(`The applicant time can not be empty.`, 'BAD_REQUEST')
    }
    if(phone === ""){
        throw new Error(`The applicant phone can not be empty.`, 'BAD_REQUEST')
    }
    if(lastname === ""){
        throw new Error(`The applicant lastname can not be empty.`, 'BAD_REQUEST')
    }
}