import { randomUUID } from 'crypto';

class Order{
    #id
    #service
    #responsible
    #applicant
    #message
    #status
    #timestamp
    constructor({service, responsible, applicant, message, status, timestamp, id = randomUUID()}){
        this.#service = service;
        this.#responsible = responsible;      
        this.#applicant = applicant;
        this.#message = message;
        this.#status = status;
        this.#timestamp = timestamp;  
        this.#id = id;
    }
    getService(){
        return this.#service;
    }
    setService(service){
        this.#service = service;
    }
    getTimestamp(){
        return this.#timestamp;
    }
    setTimestamp(timestamp){
        this.#timestamp = timestamp;
    }
    getResponsible(){
        return this.#responsible;
    }
    setResponsible(responsible){
        this.#responsible = responsible;
    }
    getApplicant(){
        return this.#applicant;
    }
    setApplicant(applicant){
        this.#applicant = applicant;
    }
    getMessage(){
        return this.#message;
    }
    setMessage(message){
        this.#message = message;
    }
    getStatus(){
        return this.#status;
    }
    setStatus(status){
        this.#status = status;
    }
    getID(){
        return this.#id;
    }
    setID(id){
        this.#id = id;
    }
    toDTO(){
        const dto = {
            service: this.#service,
            responsible: this.#responsible,    
            applicant: this.#applicant,
            timestamp: this.#timestamp,
            applicant: this.#applicant,
            message: this.#message,
            status: this.#status,
            id: this.#id
        }
        return dto
    }
}
export default Order;