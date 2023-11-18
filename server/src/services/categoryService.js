import { Error } from "../error/error.js";
import Category from "../models/category.js";
import categoryRepository from "../repositories/categoryRepository.js";

let instance = null;

class CategoryService{
    constructor(){
        this.container = categoryRepository;
    }
    getAllItems = async () => {
        let items = await this.container.getAllItems();
        if(items < 1){
            throw new Error(`No category was found`, 'BAD_REQUEST');
        }
        if(items.length === undefined){
            return items.toDTO();
        }
        let itemsDTO = [];
        items.forEach(category => {
            itemsDTO.push(category.toDTO())
        });
        return itemsDTO;
    }
    getCategory = async (categoryID) => {
        if(!(await this.checkExistingCategory(categoryID))){
            throw new Error(`No category was found matching ID ${categoryID}`, 'BAD_REQUEST');
        }
        return (await this.container.getItemByID(categoryID)).toDTO();
    }
    checkExistingCategory = async (categoryID) => {
        let categoryFound = await this.container.getItemByID(categoryID);
        return (categoryFound !== null && categoryFound.length !== 0);
    }
    createCategory = async (name) => {
        //TODO categoryDataValidation(name);
        let newCategory = new Category({name: name});
        let categoryID = await this.container.save(newCategory);
        if(!categoryID){
            throw new Error(`There was an error creating the category`, 'INTERNAL_ERROR') 
        }
        return categoryID;
    }
    static getInstance(){
        if(!instance){
            instance = new CategoryService();
        }
        return instance;
    }
}
export default CategoryService.getInstance();