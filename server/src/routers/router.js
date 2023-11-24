import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController.js'
import orderController from '../controllers/orderController.js';
import imageController from '../controllers/imageController.js';
import serviceController from '../controllers/serviceController.js';
import categoryController from '../controllers/categoryController.js';
import checkUserLogged from '../middlewares/checkUserLogged.js';
import { postImage } from '../middlewares/imageHandler.js';

const routerAPI = express.Router();
//users
routerAPI.get('/users',checkUserLogged,userController.controllerGetCurrentUser);
routerAPI.get('/users/information/:id',userController.controllerGetUserInformation);
routerAPI.post('/users', userController.controllerPostRegisterUser);
routerAPI.post('/users/:id', checkUserLogged, userController.controllerPostUpdateUser);
routerAPI.get('/users/:email', userController.controllerGetUserExisting);
routerAPI.post('/users/password/:id', userController.controllerPostResetPassword);
routerAPI.post('/logout',checkUserLogged,userController.controllerPostLogOutUser);
//sessions
routerAPI.post('/sessions', passport.authenticate('local-login', { failWithError: false }), userController.controllerPostLogInUser);
//orders
routerAPI.get('/orders',checkUserLogged, orderController.controllerGetOrders);
routerAPI.post('/orders', orderController.controllerPostOrder);
routerAPI.post('/orders/:id',checkUserLogged, orderController.controllerPostUpdateOrder);
//images
routerAPI.post('/images', checkUserLogged, postImage('file'), imageController.controllerPostImage);
routerAPI.get('/images/:name', imageController.controllerGetImage);
//services
routerAPI.get('/services', serviceController.controllerGetAllServices);
routerAPI.get('/services/:id', serviceController.controllerGetServiceByID);
routerAPI.patch('/services/:id', checkUserLogged, serviceController.controllerPatchService);
routerAPI.delete('/services/:id', checkUserLogged, serviceController.controllerDeleteService);
routerAPI.patch('/services/:serviceID/comment/:commentId', checkUserLogged, serviceController.controllerReviewCommentService);
routerAPI.post('/services/:serviceID/comment', serviceController.controllerPostComment);
routerAPI.post('/services', checkUserLogged, serviceController.controllerPostService);
routerAPI.get('/services/user/:id', serviceController.controllerGetServiceByUser);
routerAPI.get('/services/category/:id', serviceController.controllerGetServiceByCategory);
routerAPI.get('/services/recommended/:qty', serviceController.controllerGetServiceByQuantity);
//categories
routerAPI.get('/categories', categoryController.controllerGetAllCategories);
routerAPI.get('/categories/:id', categoryController.controllerGetCategoryByID);
routerAPI.post('/categories', checkUserLogged, categoryController.controllerPostCategory);

export default routerAPI;