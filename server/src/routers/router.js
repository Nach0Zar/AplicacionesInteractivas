import express from 'express';
import passport from 'passport';
import productController from '../controllers/productController.js';
import userController from '../controllers/userController.js'
import cartController from '../controllers/cartController.js';
import orderController from '../controllers/orderController.js';
import imageController from '../controllers/imageController.js';
import serviceController from '../controllers/serviceController.js';
import categoryController from '../controllers/categoryController.js';
import checkUserLogged from '../middlewares/checkUserLogged.js';
import userIsAdmin from '../middlewares/userIsAdmin.js'
import { postImage } from '../middlewares/imageHandler.js';

const routerAPI = express.Router();
//users
routerAPI.get('/users',checkUserLogged,userController.controllerGetUserInformation);
routerAPI.post('/users', userController.controllerPostRegisterUser);
routerAPI.post('/users/:id', userController.controllerPostUpdateUser);
routerAPI.get('/users/:email', userController.controllerGetUserExisting);
routerAPI.post('/users/password/:id', userController.controllerPostResetPassword);
routerAPI.post('/logout',checkUserLogged,userController.controllerPostLogOutUser);
//sessions
routerAPI.post('/sessions', passport.authenticate('local-login', { failWithError: false }), userController.controllerPostLogInUser);
//products
routerAPI.get('/products',productController.controllerGetAllProducts);
routerAPI.get('/products/:id',productController.controllerGetProductByID);
routerAPI.post('/products', checkUserLogged, userIsAdmin, productController.controllerPostProduct);
routerAPI.put('/products/:id', checkUserLogged, userIsAdmin, productController.controllerPutProductByID);
routerAPI.delete('/products/:id', checkUserLogged, userIsAdmin, productController.controllerDeleteProductByID);
//shopping cart
routerAPI.get('/shoppingcartproducts',checkUserLogged, cartController.controllerGetCartProducts);
routerAPI.post('/shoppingcartproducts',checkUserLogged, cartController.controllerPostProductToCart);
routerAPI.delete('/shoppingcartproducts/:id_prod',checkUserLogged, cartController.controllerDeleteProductFromCart);
//orders
routerAPI.get('/orders',checkUserLogged, orderController.controllerGetOrders);
routerAPI.post('/orders', orderController.controllerPostOrder);
routerAPI.post('/orders/:id',checkUserLogged, orderController.controllerPostUpdateOrder);
//images
routerAPI.post('/images', postImage('file'), imageController.controllerPostImage);
//services
routerAPI.get('/services', serviceController.controllerGetAllServices);
routerAPI.get('/services/:id', serviceController.controllerGetServiceByID);
routerAPI.patch('/services/:id', serviceController.controllerPatchService);
routerAPI.patch('/services/:serviceID/comment/:commentId', serviceController.controllerReviewCommentService);
routerAPI.post('/services/:serviceID/comment', serviceController.controllerPostComment);
routerAPI.post('/services', serviceController.controllerPostService);
routerAPI.get('/services/user/:id', serviceController.controllerGetServiceByUser);
routerAPI.get('/services/category/:id', serviceController.controllerGetServiceByCategory);
routerAPI.get('/services/recommended/:qty', serviceController.controllerGetServiceByQuantity);
//categories
routerAPI.get('/categories', categoryController.controllerGetAllCategories);
routerAPI.get('/categories/:id', categoryController.controllerGetCategoryByID);
routerAPI.post('/categories', categoryController.controllerPostCategory);

export default routerAPI;