class Mascota {
    constructor(id, nombre, categoria, fotos, descripcion, anunciante, ubicacion){
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.fotos = fotos;
        this.descripcion = descripcion;
        this.anunciante = anunciante;
        this.ubicacion = ubicacion;    
    }
}

module.exports = Mascota;