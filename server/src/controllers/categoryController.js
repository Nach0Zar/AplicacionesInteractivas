import categoryService from '../services/categoryService.js';
import logger from '../utils/logger.js';

let instance = null;

class CategoryController{
    controllerGetAllCategories = async (req, res, next) => {
        try{
            let items = await categoryService.getAllItems();
            logger.info(`GET REQUEST successful for all category`);
            res.status(200).json(items);
        }
        catch(error){
            next(error);
        }
    }
    controllerGetCategoryByID = async (req, res, next) => {
        try{
            let item = await categoryService.getCategory(req.params.id);
            logger.info(`GET REQUEST successful for category ${req.params.id}`);
            res.status(200).json(item);
        }
        catch(error){
            next(error);
        }
    }
    controllerPostCategory= async (req, res, next) => {
        try{
            let categoryID = await categoryService.createCategory(req.body.name);
            logger.info(`POST REQUEST successful for category ${categoryID}`);
            res.status(200).json({message: `The category with ID ${categoryID} was added to the catalog.`});
        }
        catch(error){
            next(error);
        }
    }
    static getInstance(){
        if(!instance){
            instance = new CategoryController();
        }
        return instance;
    }
}
export default CategoryController.getInstance();