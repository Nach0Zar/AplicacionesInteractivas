import Service from '../models/service.js';
import MongoDBContainer from "../containers/mongoDBContainer.js";

let instance = null;

class ServiceRepository {
    #dao
    constructor() {
        this.#dao = new MongoDBContainer("services");
    }
    parseItems(servicesDTOs){
        let parsedServices = [];
        servicesDTOs.forEach((service)=>{
            parsedServices.push(new Service(service));
        })
        return parsedServices;
    }
    async save(service) {
        return await this.#dao.save(service.toDTO());
    }
    async getItemByID(id) {
        const dto = await this.#dao.getItemByID(id)
        if (!dto) return null
        return new Service(dto)
    }
    async getAllItems(){
        let servicesDTOs = await this.#dao.getAllItems();
        if (!servicesDTOs) return null
        if (servicesDTOs.length === 1 || servicesDTOs.length === undefined) {
            return new Service(servicesDTOs[0])
        }
        else{
            return this.parseItems(servicesDTOs);
        }
    }
    async getItemByCriteria(criteria) {
        const dtos = await this.#dao.getItemByCriteria(criteria)
        if (!dtos) return null
        if (dtos.length === undefined) return new Service(dtos);
        if (dtos.length === 1) {
            return new Service(dtos[0]);
        }
        else{
            return this.parseItems(dtos);
        }
    }
    async getServiceByResponsible(userID) {
        const dtos = await this.#dao.getItemByReferenceID("responsible", userID)
        if (!dtos) return null
        if (dtos.length === undefined) return new Service(dtos);
        if (dtos.length === 1) {
            return new Service(dtos[0]);
        }
        else{
            return this.parseItems(dtos);
        }
    }
    async getServiceByCategory(categoryID) {
        const dtos = await this.#dao.getItemByReferenceID("categories", categoryID)
        if (!dtos) return null
        if (dtos.length === undefined) return new Service(dtos);
        if (dtos.length === 1) {
            return new Service(dtos[0]);
        }
        else{
            return this.parseItems(dtos);
        }
    }
    async modifyByID(id, newService){
        let updateInfo = {
            name: newService.name,
            price: newService.price,
            image: newService.image,
            description: newService.description,
            duration: newService.duration,
            frequency: newService.frequency,
            published: newService.published
        }
        return await this.#dao.modifyByID(id, updateInfo);
    }
    async deleteByID(id){
        return this.#dao.deleteByID(id)
    }
    static getInstance(){
        if(!instance){
            instance = new ServiceRepository();
        }
        return instance;
    }
}
export default ServiceRepository.getInstance();