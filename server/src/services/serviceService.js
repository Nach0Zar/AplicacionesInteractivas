import { Error } from "../error/error.js";
import Service from "../models/service.js";
import serviceRepository from "../repositories/serviceRepository.js";
import { randomUUID } from 'crypto';
import servicePatchValidation from "../validations/servicePatchValidation.js";

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
    createService = async (name, price, image, description, categories, responsible, duration, frequency, comments, qualification, published, type) => {
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
            comments: comments == null ? [] : comments,
            qualification: qualification,
            published: published,
            type: type
        }
        );
        let serviceID = await this.container.save(newService);
        if(!serviceID){
            throw new Error(`There was an error creating the service`, 'INTERNAL_ERROR') 
        }
        return serviceID;
    }
    updateService = async(serviceID, servicePatch) => {
        if(!(await this.checkExistingService(serviceID))){
            throw new Error(`No service was found matching ID ${serviceID}`, 'BAD_REQUEST');
        }
        let service = await this.container.getItemByID(serviceID);
        let databaseService = service;
        servicePatch.qualification = service.getQualification();
        servicePatch.comments = service.getComments();
        servicePatch.image = service.getImage();
        service.modify(servicePatch);
        servicePatchValidation(service, databaseService);
        let modified = await this.container.modifyByID(serviceID, service.toDTO())
        if(!modified) {
            throw new Error("There was an error updating the service", 'INTERNAL_ERROR')
        }
    }
    deleteService = async(id) => {
        let count = await this.container.deleteByID(id)
        if(count == 0) {
            throw new Error("There was an error deleting the service", 'INTERNAL_ERROR')
        }
    }
    reviewComment = async(serviceId, commentId, accepted) => {
        let toUpdate = await this.container.getItemByID(serviceId);
        let newCommentsArray = toUpdate.getComments()
        if(accepted) {
            let countReviewsApproved = 0
            let sumTotalReviewsApproved = 0
            newCommentsArray.forEach((comment) => {
                if(comment.id === commentId){
                    comment.reviewed = true
                }
                if(comment.reviewed === true){
                    countReviewsApproved++
                    sumTotalReviewsApproved = sumTotalReviewsApproved + comment.qualification
                }
            })
            let newQualificationProm = sumTotalReviewsApproved/countReviewsApproved
            toUpdate.setQualification(newQualificationProm)
        } else {
            newCommentsArray = newCommentsArray.filter((comment) => comment.id != commentId)
        }
        toUpdate.setComments(newCommentsArray);
        let count = await this.container.modifyByID(serviceId, toUpdate.toDTO())
        if(count == 0) {
            throw new Error("There was an error updating the comment", "INTERNAL_ERROR")
        }
    }
    addComment = async(idService, user, message, qualification) => {
        if(!(await this.checkExistingService(idService))){
            throw new Error(`No service was found matching ID ${idService}`, 'BAD_REQUEST');
        }
        if(qualification == ""){
            qualification = 0
        }
        else{
            qualification = +qualification;
        }
        let service = await this.container.getItemByID(idService);
        const newComment = {
            user,
            message,
            qualification,
            reviewed: false,
            id: randomUUID()
        }
        service.addComment(newComment);
        let serviceID = await this.container.modifyByID(idService, service.toDTO())
        if(!serviceID){
            throw new Error(`There was an error creating the service`, 'INTERNAL_ERROR') 
        }
        return serviceID;
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
        let index = 0;
        while (index < services.length && servicesDTO.length < quantity){
            if(services[index].getPublished()){
                servicesDTO.push(services[index].toDTO())
            }
            index++;
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