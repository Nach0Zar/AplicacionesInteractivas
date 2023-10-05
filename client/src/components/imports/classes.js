export class Articulo{
    static idCounter = 0;
    constructor(id, nombreArticulo, descripcion, precio, imgSrc, categorias, cantidad, stock){
        if (id === -1){ 
            this.id = Articulo.getIdCounter();
        } 
        else {
            this.id = id;
        }
        Articulo.idCounter++;
        this.nombreArticulo = nombreArticulo;
        this.descripcion = descripcion;
        this.precio = parseInt(precio);
        this.imgSrc = imgSrc;
        this.cantidad = cantidad;
        this.categorias = categorias;
        this.stock = stock;
    }
    static getIdCounter(){
        return Articulo.idCounter;
    }
}

export class Servicio{
    static idCounter = 0;
    constructor({id, name, description, price, responsible, categories, 
                duration, frequency, comments, qualification, image, type, published}){
        if (id === -1){ 
            this.id = Servicio.getIdCounter();
        } 
        else {
            this.id = id;
        }
        Servicio.idCounter++;
        this.name = name;
        this.description = description;
        this.price = parseInt(price);
        this.responsible = responsible;
        this.duration = duration;
        this.categories = categories;
        this.frequency = frequency;
        this.comments = comments;
        this.qualification = qualification;
        this.image = image;
        this.type = type;
        this.published = published;
    }
    static getIdCounter(){
        return Servicio.idCounter;
    }
}
export class Categoria{
    static idCounter = 0;
    constructor({id, name}){
        if (id === -1){ 
            this.id = Categoria.getIdCounter();
            Categoria.idCounter++
        } 
        else {
            this.id = id;
        }
        this.name = name;
    }
    static getIdCounter(){
        return Categoria.idCounter;
    }
}

export class Usuario{
    static idCounter = 0;
    constructor({id, name, lastname, password, email, phone, title, experience}){
        if (id === -1){ 
            this.id = Categoria.getIdCounter();
            Categoria.idCounter++
        } 
        else {
            this.id = id;
        }
        this.name = name;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.title = title;
        this.experience = experience;
    }
    static getIdCounter(){
        return Categoria.idCounter;
    }
};

export class Order{
    static idCounter = 0;
    constructor({id, service, applicant, message, status, timestamp, responsible}){
        if (id === -1){ 
            this.id = Categoria.getIdCounter();
            Categoria.idCounter++
        } 
        else {
            this.id = id;
        }
        this.service = service;//full service info, with responsible
        this.applicant = applicant;//with name, lastname, email, phone, time
        this.message = message;
        this.status = status; //requested, approved, cancelled, done
        this.timestamp = timestamp;
        this.responsible = responsible;
    }
    static getIdCounter(){
        return Categoria.idCounter;
    }
}