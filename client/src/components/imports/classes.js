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
    constructor(nombreUsuario, password, direccion, email, dni, telefono){
        this.id = nombreUsuario;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.direccion = direccion;
        this.email = email;
        this.dni = dni;
        this.telefono = telefono;
    }
    
};