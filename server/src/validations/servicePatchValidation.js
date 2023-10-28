import { Error } from "../error/error.js";

export default function servicePatchValidation(service, patchedService) {
    if(service.name === patchedService.name &&
        service.price === patchedService.price &&
        service.image === patchedService.image &&
        service.description === patchedService.description &&
        service.categories === patchedService.categories &&
        service.responsible === patchedService.responsible &&
        service.duration === patchedService.duration &&
        service.frequency === patchedService.frequency &&
        service.comments === patchedService.comments &&
        service.qualification === patchedService.qualification &&
        service.published === patchedService.published){
        throw new Error(`No change was detected.`, 'BAD_REQUEST')
    }
}