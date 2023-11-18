import { Error } from "../error/error.js";

export default function userOwnershipValidation(responsibleID, serviceResponsibleID) {
    if(responsibleID != serviceResponsibleID){
        throw new Error(`The editor is not the owner of the Service.`, 'BAD_REQUEST')
    }
}