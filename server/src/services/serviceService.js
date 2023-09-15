import { Error } from "../error/error.js";
import Service from "../models/service.js";
import serviceRepository from "../repositories/serviceRepository.js";

let instance = null;

class ServiceService{
    constructor(){
        this.container = serviceRepository;
    }
    getAllItems = async () => {
        let items = await this.container.getAllItems();
        if(items < 1){
            throw new Error(`No service was found`, 'BAD_REQUEST');
        }
        if(items.length === undefined){
            return items.toDTO();
        }
        let itemsDTO = [];
        items.forEach(service => {
            itemsDTO.push(service.toDTO())
        });
        return itemsDTO;
    }
    createService = async (name, price, image, description, responsible, duration, frequency, comments, qualification) => {
        //TODO serviceDataValidation(name, price, image, description, responsible, duration, frequency, comments, qualification);
        let newService = new Service({
            name: name, 
            price: +price, 
            image: image,
            description: description,
            responsible: responsible,
            duration: duration,
            frequency: frequency,
            comments: comments,
            qualification: qualification
        }
        );
        let serviceID = await this.container.save(newService);
        if(!serviceID){
            throw new Error(`There was an error creating the service`, 'INTERNAL_ERROR') 
        }
        return serviceID;
    }
    static getInstance(){
        if(!instance){
            instance = new ServiceService();
        }
        return instance;
    }
}
export default ServiceService.getInstance();