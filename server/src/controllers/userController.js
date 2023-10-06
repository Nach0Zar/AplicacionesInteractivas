import config from '../config/config.js';
import userService from '../services/userService.js';
import registerUserValidation from '../validations/registerUserValidation.js';
import logger from '../utils/logger.js';

let instance = null;

class UserController{
    controllerPostRegisterUser = async (req, res, next) => {
        try{
            await registerUserValidation(req);
            let userID = await userService.registerUser(req.body);
            logger.info(`POST REQUEST successful for registering user ${userID}`);
            res.status(201).json(userID)
        }
        catch(error){
            next(error);
        }
    }
    controllerPostLogInUser = async (req, res, next) => {
        try{
            let userEmailValidated = await userService.loginUser(req.body.email);
            logger.info(`POST REQUEST successful for logging in user with email ${userEmailValidated}`);
            res.cookie('email', userEmailValidated/*, {maxAge: config.SESSION.EXPIRY_TIME}*/);
            res.sendStatus(200);
        }
        catch(error){
            next(error);
        }
    }
    controllerPostLogOutUser = (req, res) => {
        res.clearCookie('email');
        logger.info(`POST REQUEST successful for logging out user`);
        res.sendStatus(200);
    }
    controllerGetCurrentUser = async (req, res, next) => {
        try{
            let userInformation = await userService.getUserInformation(req.cookies.email);
            logger.info(`GET REQUEST successful for getting the information of user ${req.cookies.email}`);
            delete userInformation.password;
            res.status(200).json(userInformation);
        }
        catch(error){
            next(error);
        }
    }
    controllerGetUserInformation = async (req, res, next) => {
        try{
            let userInformation = await userService.getUserByID(req.params.id);
            logger.info(`GET REQUEST successful for getting the information of user ${req.params.id}`);
            delete userInformation.password;
            res.status(200).json(userInformation);
        }
        catch(error){
            next(error);
        }
    }
    controllerPostUpdateUser = async (req, res, next) => {
        try{
            await userService.updateUser(req.params.id, req.body);
            logger.info(`POST REQUEST successful for updating the user ${req.body.id}`);
            res.sendStatus(200);
        }
        catch(error){
            next(error);
        }
    }
    controllerGetUserExisting = async (req, res, next) => {
        try{
            await userService.checkExistingUser(req.params.email);
            let user = await userService.getUserInformation(req.params.email);
            logger.info(`POST REQUEST successful for checking the user ${req.params.email}`);
            res.status(200).json(user.id);
        }
        catch(error){
            next(error);
        }
    }
    controllerPostResetPassword = async (req, res, next) => {
        try{
            await userService.resetPassword(req.params.id);
            logger.info(`POST REQUEST successful for resetting the password for the user ${req.params.id}`);
            res.sendStatus(200);
        }
        catch(error){
            next(error);
        }
    }
    static getInstance(){
        if(!instance){
            instance = new UserController();
        }
        return instance;
    }
}
export default UserController.getInstance();