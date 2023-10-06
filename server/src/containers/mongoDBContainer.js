import { mongoDatabase } from '../db/mongoClient.js';
import { ObjectId } from 'mongodb';
export default class MongoDBContainer {
    constructor(dataType) {
        this.items = mongoDatabase.collection(dataType);
    }
    async save(object) {
        delete object.id;//removes the object ID
        return (await this.items.insertOne(object)).insertedId.toString()
    }
    async getItemByID(idItem) {
        let criterio = { _id: ObjectId(idItem) };
        let item = await this.items.find(criterio).toArray();
        if(!item.toString()){//to check if no doc was found
            return null;
        }
        return (this.parseData(item[0]))
    }
    async getAllItems(){
        let items = await this.items.find({}).toArray();
        if(!items.toString()){//to check if no doc was found
            return null;
        }
        let itemList = []
        items.forEach(item => {
            itemList.push(this.parseData(item))
        });
        return itemList
    }
    async getItemByCriteria(criteria) {
        let item = await this.items.find(criteria).toArray();
        if(item instanceof Array && item.length !== 0) return (this.parseMultipleData(item))
        if(!item.toString()){//to check if no doc was found
            return null;
        }
        return (this.parseData(item))
    }
    async getItemByReferenceID(field, id){
        let criteria = {};
        criteria[field] = ObjectId(id);
        return this.getItemByCriteria(criteria);
    }
    async modifyByID(idItem, newItemParam){
        delete newItemParam.id;
        let query = await this.items.updateOne({ _id: ObjectId(idItem) }, { $set: newItemParam });
        return (query.modifiedCount > 0);
    }
    async addComment(serviceId, newComment) {
        const service = await this.getItemByID(serviceId)
        delete service.id;
        service.comments.push(newComment)
        let query = await this.items.updateOne({ _id: ObjectId(serviceId) }, { $set: service });
        return (query.modifiedCount > 0);
    }
    async modifyCommentsArray(serviceId, newArray) {
        const service = await this.getItemByID(serviceId)
        delete service.id;
        service.comments = newArray
        let query = await this.items.updateOne({ _id: ObjectId(serviceId) }, { $set: service });
        return (query.modifiedCount > 0);
    }
    async markAsReviewed(serviceId, commentId) {
        const service = this.getItemByID(serviceId)
        service.comments.forEach((comment) => {
            if(comment.id == commentId){
                comment.reviewed = true
            }
        })
        return this.modifyByID(serviceId, service)
    }
    async deleteNotAccepted(serviceId, commentId) {
        const service = this.getItemByID(serviceId)
        const newComments = service.comments.filter((comment) => comment.id != commentId)
        service.comments = newComments
        return this.modifyByID(serviceId, service)
    }
    async deleteByID(idItem){
        let criterio = { _id: ObjectId(idItem) };
        let query = await this.items.deleteOne(criterio);
        return (query.deletedCount > 0);
    }
    parseData(item){//parse _id to id in order to manage the same property 
        let data = {
            id: item._id.toString(), ...item
        }
        delete data._id;
        return data
    }
    parseMultipleData(items){
        return items.map((item) => this.parseData(item))
    }
}
