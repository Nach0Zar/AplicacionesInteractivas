import Category from '../models/category.js';
import MongoDBContainer from "../containers/mongoDBContainer.js";

let instance = null;

class categoryRepository {
    #dao
    constructor() {
        this.#dao = new MongoDBContainer("categories");
    }
    parseItems(categoriesDTOs){
        let parsedCategories = [];
        categoriesDTOs.forEach((category)=>{
            parsedCategories.push(new Category(category));
        })
        return parsedCategories;
    }
    async save(category) {
        return await this.#dao.save(category.toDTO());
    }
    async getItemByID(id) {
        const dto = await this.#dao.getItemByID(id)
        if (!dto) return null
        return new Category(dto)
    }
    async getAllItems(){
        let categoriesDTOs = await this.#dao.getAllItems();
        if (!categoriesDTOs) return null
        if (categoriesDTOs.length === 1 || categoriesDTOs.length === undefined) {
            return new Category(categoriesDTOs[0])
        }
        else{
            return this.parseItems(categoriesDTOs);
        }
    }
    async getItemByCriteria(criteria) {
        const dtos = await this.#dao.getItemByCriteria(criteria)
        if (!dtos) return null
        if (dtos.length === undefined) return new Category(dtos);
        if (dtos.length === 1) {
            return new Category(dtos[0]);
        }
        else{
            return this.parseItems(dtos);
        }
    }
    async modifyByID(id, newCategory){
        let updateInfo = {
            name: newCategory.name
        }
        return await this.#dao.modifyByID(id, updateInfo);
    }
    async deleteByID(id){
        return this.#dao.deleteByID(id)
    }
    static getInstance(){
        if(!instance){
            instance = new categoryRepository();
        }
        return instance;
    }
}
export default categoryRepository.getInstance();