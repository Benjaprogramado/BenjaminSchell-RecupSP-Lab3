

class Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, fecha) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
        this.fecha = fecha;


    }
}
class Anuncio_Auto extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, num_puertas, num_KMs, potencia, fecha) {
        super(id, titulo, transaccion, descripcion, precio, fecha);
        this.num_puertas = num_puertas;
        this.num_KMs = num_KMs;
        this.potencia = potencia;

    }
}
