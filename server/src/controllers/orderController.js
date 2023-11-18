import orderService from '../services/orderService.js';
import logger from '../utils/logger.js';

let instance = null;

class OrderController{
    controllerGetOrders = async (req, res, next) => {
        try{
            let orders = await orderService.getUserOrders(req.cookies.email);
            logger.info(`GET REQUEST successful for getting all orders from user ${req.cookies.email}`);
            res.status(200).json(orders);
        }
        catch(error){
            next(error);
        }
    }
    controllerPostOrder = async (req, res, next) => {
        try{
            let order = await orderService.createOrder(req.body);
            logger.info(`POST REQUEST successful for service ${req.body.service} for ${req.body.applicant.email}`);
            res.status(200).json(order);
        }
        catch(error){
            next(error);
        }
    }
    controllerPostUpdateOrder = async (req, res, next) => {
        try{
            await orderService.updateOrderStatus(req.params.id, req.cookies.email, req.body.status);
            logger.info(`POST REQUEST successful for service ${req.params.id} for new status ${req.body.status}`);
            res.sendStatus(200);
        }
        catch(error){
            next(error);
        }
    }
    static getInstance(){
        if(!instance){
            instance = new OrderController();
        }
        return instance;
    }
}
export default OrderController.getInstance();