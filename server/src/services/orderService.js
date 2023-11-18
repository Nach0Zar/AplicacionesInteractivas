import { Error } from "../error/error.js";
import mailer from "../utils/mailer.js";
import config from "../config/config.js";
import orderRepository from "../repositories/orderRepository.js";
import Order from "../models/order.js";
import userService from "./userService.js";
import serviceService from "./serviceService.js";
import applicantDataValidation from "../validations/applicantDataValidation.js"
import userOwnershipValidation from "../validations/userOwnershipValidation.js";

let instance = null;

class OrderService{
    constructor(){
        this.container = orderRepository;
    }
    getOrder = async (orderID) => {
        let order = await this.container.getItemByID(orderID)
        if(!order){
            throw new Error(`No order was found with the id ${orderID}`, 'NOT_FOUND');
        }            
        return order.toDTO();
    }
    getUserOrders = async (userEmail) => {
        let user = await userService.getUserInformation(userEmail);
        let orders = await this.container.getOrderByResponsible(user.id)
        if(!orders || orders.length == 0){
            throw new Error(`No order was found for the user with the email ${userEmail}`, 'NOT_FOUND');
        }       
        if(orders.length === undefined) {
            return [orders.toDTO()];
        }
        let ordersDTO = [];
        orders.forEach(order => {
            ordersDTO.push(order.toDTO())
        });
        return ordersDTO;
    }
    createOrder = async (order) => {
        applicantDataValidation(order.applicant);
        let service = await serviceService.getService(order.service);
        let timestamp = new Date().toLocaleString();
        let orderObject = new Order({
            service: service,  
            applicant: order.applicant,
            responsible: service.responsible,
            message: order.message,
            status: "requested",
            timestamp: timestamp
        });
        mailer.send({
            to: order.applicant.email,
            subject: `Purchase order processed!`,
            text: `Service acquired: ${service.name}`
        })
        let orderID = await this.container.save(orderObject);
        return orderID;
    }
    updateOrderStatus = async (orderID, responsibleEmail, status) => {
        let order = await this.getOrder(orderID);
        let user = await userService.getUserInformation(responsibleEmail);
        userOwnershipValidation(user.id, order.responsible);
        order.status = status;
        await this.container.modifyByID(orderID, order).then(()=>{
            return true;
        }).catch((error)=>{            
            throw new Error(error, 'INTERNAL_ERROR')
        });
    }
    static getInstance(){
        if(!instance){
            instance = new OrderService();
        }
        return instance;
    }
}
export default OrderService.getInstance();