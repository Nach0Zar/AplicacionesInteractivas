import serviceService from '../services/serviceService.js';
import logger from '../utils/logger.js';

let instance = null;

class ServiceController{
    controllerGetAllServices = async (req, res, next) => {
        try{
            let items = await serviceService.getAllItems();
            logger.info(`GET REQUEST successful for all services`);
            res.status(200).json(items);
        }
        catch(error){
            next(error);
        }
    }
    controllerGetServiceByID = async (req, res, next) => {
        try{
            let item = await serviceService.getService(req.params.id);
            logger.info(`GET REQUEST successful for service ${req.params.id}`);
            res.status(200).json(item);
        }
        catch(error){
            next(error);
        }
    }
    controllerGetServiceByUser = async (req, res, next) => {
        try{
            let item = await serviceService.getUserServices(req.params.id);
            logger.info(`GET REQUEST successful for user services from user ID ${req.params.id}`);
            res.status(200).json(item);
        }
        catch(error){
            next(error);
        }
    }
    controllerGetServiceByCategory = async (req, res, next) => {
        try{
            let item = await serviceService.getCategoryServices(req.params.id);
            logger.info(`GET REQUEST successful for category services from category ID ${req.params.id}`);
            res.status(200).json(item);
        }
        catch(error){
            next(error);
        }
    }
    controllerPostService = async (req, res, next) => {
        try{
            let serviceID = await serviceService.createService(req.body.name, req.body.price, req.body.image, req.body.description, req.body.categories, 
                                                               req.body.responsible, req.body.duration, req.body.frequency, req.body.comments, req.body.qualification);
            logger.info(`POST REQUEST successful for service ${serviceID}`);
            res.status(200).json({message: `The service with ID ${serviceID} was added to the catalog.`});
        }
        catch(error){
            next(error);
        }
    }
    controllerGetServiceByQuantity = async (req, res, next) => {
        try{
            let item = await serviceService.getServicesByQuantity(req.params.qty);
            logger.info(`GET REQUEST successful for recommended ${req.params.qty} services.`);
            res.status(200).json(item);
        }
        catch(error){
            next(error);
        }
    }
    static getInstance(){
        if(!instance){
            instance = new ServiceController();
        }
        return instance;
    }
}
export default ServiceController.getInstance();