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
                duration, frequency, comments, qualification, image, type}){
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
    }
    static getIdCounter(){
        return Servicio.idCounter;
    }
}
export class Categoria{
    static idCounter = 0;
    constructor(idCategoria, nombreCategoria){
        if (idCategoria === -1){ 
            this.idCategoria = Categoria.getIdCounter();
            Categoria.idCounter++
        } 
        else {
            this.idCategoria = idCategoria;
        }
        this.nombreCategoria = nombreCategoria;
    }
    static getIdCounter(){
        return Categoria.idCounter;
    }
}

export class Usuario{
    constructor({id, name, lastname, password, email, phone, title, experience}){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.title = title;
        this.experience = experience;
    }
};