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
    getService = async (serviceID) => {
        if(!(await this.checkExistingService(serviceID))){
            throw new Error(`No service was found matching ID ${serviceID}`, 'BAD_REQUEST');
        }
        return (await this.container.getItemByID(serviceID)).toDTO();
    }
    checkExistingService = async (serviceID) => {
        let serviceFound = await this.container.getItemByID(serviceID);
        return (serviceFound !== null && serviceFound.length !== 0);
    }
    createService = async (name, price, image, description, categories, responsible, duration, frequency, comments, qualification, published) => {
        //TODO serviceDataValidation(name, price, image, description, categories, responsible, duration, frequency, comments, qualification);
        let newService = new Service({
            name: name, 
            price: +price, 
            image: image,
            description: description,
            categories: categories,
            responsible: responsible,
            duration: duration,
            frequency: frequency,
            comments: comments,
            qualification: qualification,
            published: published
        }
        );
        let serviceID = await this.container.save(newService);
        if(!serviceID){
            throw new Error(`There was an error creating the service`, 'INTERNAL_ERROR') 
        }
        return serviceID;
    }
    updateService = async(id, name, price, image, description, categories, duration, frequency, published) => {
        // let toUpdate = new Service({
        //     name: name, 
        //     price: +price, 
        //     image: image,
        //     description: description,
        //     id: id,
        //     categories: categories,
        //     responsible: responsible,
        //     duration: duration,
        //     frequency: frequency,
        //     comments: comments,
        //     qualification: qualification,
        //     published: published
        // }
        console.log("servicio")
        let toUpdate = {
            name: name, 
            price: +price, 
            image: image,
            description: description,
            id: id,
            categories: categories,
            duration: duration,
            frequency: frequency,
            published: published
        }
        
        let count = await this.container.modifyByID(id, toUpdate)
        if(count == 0) {
            throw new Error("There was an error updating the service, nothing impacted", "NOT_FOUND")
        }
    }
    getUserServices = async (userID) => {
        let services = await this.container.getServiceByResponsible(userID);
        if(!services || services.length == 0){
            throw new Error(`No service was found for the user with the id ${userID}`, 'NOT_FOUND');
        }       
        if(services.length === undefined) {
            return services.toDTO();
        }
        let servicesDTO = [];
        services.forEach(service => {
            servicesDTO.push(service.toDTO())
        });
        return servicesDTO;
    }
    getCategoryServices = async (categoryID) => {
        let services = await this.container.getServiceByCategory(categoryID);
        if(!services || services.length == 0){
            throw new Error(`No service was found for the category with the id ${categoryID}`, 'NOT_FOUND');
        }       
        if(services.length === undefined) {
            return services.toDTO();
        }
        let servicesDTO = [];
        services.forEach(service => {
            servicesDTO.push(service.toDTO())
        });
        return servicesDTO;
    }
    getServicesByQuantity = async (quantity) => {
        let services = await this.container.getAllItems();
        if(!services || services.length == 0){
            throw new Error(`No service was found for the category with the id ${categoryID}`, 'NOT_FOUND');
        }       
        if(services.length === undefined) {
            return services.toDTO();
        }
        let servicesDTO = [];
        for(let index = 0; index < quantity; index++){
            servicesDTO.push(services[index].toDTO())
        }
        return servicesDTO;
    }
    static getInstance(){
        if(!instance){
            instance = new ServiceService();
        }
        return instance;
    }
}
export default ServiceService.getInstance();