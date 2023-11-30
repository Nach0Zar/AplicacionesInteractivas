import { randomUUID } from 'crypto';
import { ObjectId } from 'mongodb';
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
    #type
    #published
    constructor({name, price, image, description, id = randomUUID(), categories, responsible, duration, frequency, comments, qualification, type, published}){
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
        this.#type = type;
        this.#published = published
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
    getImage(){
        return this.#image;
    }
    setImage(image){
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
    getType(){
        return this.#type
    }
    setType(type){
        this.#type = type;
    }
    getComments(){
        return this.#comments
    }
    setComments(comments){
        this.#comments = comments;
    }
    addComment(comment){
        this.#comments.push(comment);
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
    getPublished(){
        return this.#published;
    }
    setPublished(published){
        this.#published = published;
    }
    modify({name, price, image, description, categories, responsible, duration, frequency, comments, qualification, published}){
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
        this.setPublished(published);
    }
    toDTO(){
        const dto = {
            name: this.#name,
            price: this.#price,
            image: this.#image,
            categories: this.#categories.map(c => ObjectId(c)),
            description: this.#description,
            responsible: ObjectId(this.#responsible),
            duration: this.#duration,
            frequency: this.#frequency,
            comments: this.#comments,
            qualification: this.#qualification,
            type: this.#type,
            id: this.#id,
            published: this.#published
        }
        return dto
    }
}
export default Service;