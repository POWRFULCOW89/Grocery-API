class Usuario {
    constructor(id, usuario, nombre, contraseña, rol){
        this.id = id;
        this.usuario = usuario;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.rol = rol;
    }
}

module.exports = Usuario;