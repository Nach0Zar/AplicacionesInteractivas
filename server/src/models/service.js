import { randomUUID } from 'crypto';
class Service{
    #name
    #price
    #image
    #description
    #categories
    #id
    #responsible
    #duration
    #frequency
    #comments
    #qualification
    constructor({name, price, image, description, id = randomUUID(), categories, responsible, duration, frequency, comments, qualification}){
        this.#name = name;
        this.#price = +price;
        this.#image = image;
        this.#description = description;
        this.#categories = categories;
        this.#id = id;
        this.#responsible = responsible;
        this.#duration = duration;
        this.#frequency = frequency;
        this.#comments = comments;
        this.#qualification = qualification;
    }
    getName(){
        return this.#name;
    }
    setName(name){
        this.#name = name;
    }
    getPrice(){
        return this.#price;
    }
    setPrice(price){
        this.#price = price;   
    }
    setImage(){
        return this.#image;
    }
    getImage(image){
        this.#image = image;  
    }
    getDescription(){
        return this.#description;
    }
    setDescription(description){
        this.#description = description;
    }
    getID(){
        return this.#id;
    }
    setID(id){
        this.#id = id;
    }
    getResponsible(){
        return this.#responsible
    }
    setResponsible(responsible){
        this.#responsible = responsible;
    }
    getDuration(){
        return this.#duration
    }
    setDuration(duration){
        this.#duration = duration;
    }
    getFrequency(){
        return this.#frequency
    }
    setFrequency(frequency){
        this.#frequency = frequency;
    }
    getComments(){
        return this.#comments
    }
    setComments(comments){
        this.#comments = comments;
    }
    getQualification(){
        return this.#qualification
    }
    setQualification(qualification){
        this.#qualification = qualification;
    }
    addCategory(category){
        this.#categories.push(category);
    }
    getCategories(){
        return this.#categories
    }
    setCategories(categories){
        this.#categories = categories;
    }
    modify({name, price, image, description, categories, responsible, duration, frequency, comments, qualification}){
        this.setName(name);
        this.setPrice(price);
        this.setImage(image);
        this.setDescription(description);
        this.setCategories(categories);
        this.setResponsible(responsible);
        this.setDuration(duration);
        this.setFrequency(frequency);
        this.setComments(comments);
        this.setQualification(qualification);
    }
    toDTO(){
        const dto = {
            name: this.#name,
            price: this.#price,
            image: this.#image,
            categories: this.#categories,
            description: this.#description,
            responsible: this.#responsible,
            duration: this.#duration,
            frequency: this.#frequency,
            comments: this.#comments,
            qualification: this.#qualification,
            id: this.#id
        }
        return dto
    }
}
export default Service;