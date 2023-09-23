import { randomUUID } from 'crypto';
class User{
    #id
    #email
    #password
    #name
    #lastname
    #cart
    #phone
    #title
    #experience
    constructor({email, password, name, lastname, cart, phone, title, experience, id = randomUUID()}){
        this.#email = email;
        this.#password = password;
        this.#name = name;
        this.#lastname = lastname;
        this.#cart = cart;
        this.#id = id;
        this.#phone = phone;
        this.#title = title;
        this.#experience = experience;
    }
    getEmail(){
        return this.#email;
    }
    setEmail(email){
        this.#email = email;
    }
    getPassword(){
        return this.#password;
    }
    setPassword(password){
        this.#password = password;
    }
    getName(){
        return this.#name;
    }
    setName(name){
        this.#name = name;
    }
    getLastname(){
        return this.#lastname;
    }
    setLastname(lastname){
        this.#lastname = lastname;
    }
    getCart(){
        return this.#cart;
    }
    setCart(cart){
        this.#cart = cart;
    }
    getID(){
        return this.#id;
    }
    setID(id){
        this.#id = id;
    }
    getPhone(){
        return this.#phone;
    }
    setPhone(phone){
        this.#phone = phone;
    }
    getTitle(){
        return this.#title;
    }
    setTitle(title){
        this.#title = title;
    }
    getExperience(){
        return this.#experience;
    }
    setExperience(experience){
        this.#experience = experience;
    }
    addExperience(experience){
        this.#experience.push(experience);
    }
    toDTO(){
        const dto = {
            email: this.#email,
            password: this.#password,
            name: this.#name,
            lastname: this.#lastname,
            id: this.#id,
            cart: this.#cart,
            phone: this.#phone,
            title: this.#title,
            experience: this.#experience
        }
        return dto
    }
}
export default User;