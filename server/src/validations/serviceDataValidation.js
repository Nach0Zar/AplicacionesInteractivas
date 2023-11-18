import { Error } from "../error/error.js";

export default function serviceDataValidation(name, price, image, description) {
    if(name === ""){
        throw new Error(`The service name can not be empty.`, 'BAD_REQUEST')
    }
    if(price === ""){
        throw new Error(`The service price can not be empty.`, 'BAD_REQUEST')
    }
    if(image === ""){
        throw new Error(`The service image can not be empty.`, 'BAD_REQUEST')
    }
    if(description === ""){
        throw new Error(`The service description can not be empty.`, 'BAD_REQUEST')
    }
    if(isNaN(price)){
        throw new Error(`The service price must be a number.`, 'BAD_REQUEST')
    }
    if(+price < 0){
        throw new Error(`The service price can not be negative.`, 'BAD_REQUEST')
    }
    if(+price === 0){
        throw new Error(`The service price can not be zero.`, 'BAD_REQUEST')
    }
}