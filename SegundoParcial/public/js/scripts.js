
let dataActual;
let dataOriginal;
let frm = document.forms[0];
frm.addEventListener('submit', manejadorSubmit);
document.getElementById("btnBorrar").addEventListener('click', bajaAnuncio);
document.getElementById("btnCancelar").addEventListener('click', cancelar);
// document.getElementById("divChks").addEventListener('click', cheksRemember);
document.getElementById("divChks").addEventListener('click', traerAnuncios);
document.getElementById("txtFiltros").addEventListener('change', traerAnuncios);

chart();
readCheksRemember();
traerAnuncios();




function seleccionaCheks() {
    if (!document.getElementById("cboxId").checked ||
        !document.getElementById("cboxTitulo").checked ||
        !document.getElementById("cboxTransaccion").checked ||
        !document.getElementById("cboxDescripcion").checked ||
        !document.getElementById("cboxPrecio").checked ||
        !document.getElementById("num_puertas").checked ||
        !document.getElementById("num_KMs").checked ||
        !document.getElementById("potencia").checked) {
        window.alert("Seleccione todas las columnas para realizar modificaciones!!");
    }
}

function actualizarVista() {

    let tds = document.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
        let td = tds[i];
        td.addEventListener('click', seleccionaCheks);
        td.addEventListener('click', setValues);
    }

    document.getElementById("btnBorrar").hidden = true;
    document.getElementById("btnCancelar").hidden = true;
    frm.removeEventListener('submit', manejadorModificar);
    frm.addEventListener('submit', manejadorSubmit);
    limpiarValues();
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target);
    altaAnuncio(nuevoAnuncio);
}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target);
    modificarAnuncio(anuncio);
}


function cancelar() {
    document.getElementById("btnBorrar").hidden = true;
    document.getElementById("btnCancelar").hidden = true;
    frm.removeEventListener('submit', manejadorModificar);
    frm.addEventListener('submit', manejadorSubmit);
    actualizarVista();
}



function filtroCheks(anunciosOriginales) {
    let id = document.getElementById("cboxId");
    let titulo = document.getElementById("cboxTitulo");
    let transaccion = document.getElementById("cboxTransaccion");
    let descripcion = document.getElementById("cboxDescripcion");
    let precio = document.getElementById("cboxPrecio");
    let num_puertas = document.getElementById("num_puertas");
    let num_KMs = document.getElementById("num_KMs");
    let potencia = document.getElementById("potencia");

    nuevaData = anunciosOriginales.map((a) => {

        let object = new Object();
        if (id.checked) object.id = a.id;
        if (titulo.checked) object.titulo = a.titulo;
        if (transaccion.checked) object.transaccion = a.transaccion;
        if (descripcion.checked) object.descripcion = a.descripcion;
        if (precio.checked) object.precio = a.precio;
        if (num_puertas.checked) object.num_puertas = a.num_puertas;
        if (num_KMs.checked) object.num_KMs = a.num_KMs;
        if (potencia.checked) object.potencia = a.potencia;
        return object;
    })

    return nuevaData;

}

function filtroTransaccion(data) {

    let filtro = document.getElementById("txtFiltros").value;
    let nuevaData = data;

    if (filtro == "Venta") {
        nuevaData = data.filter(a => a.transaccion === "Venta").map(a => a);
    }
    if (filtro == "Alquiler") {
        nuevaData = data.filter(a => a.transaccion === "Alquiler").map(a => a);
    }

    return nuevaData;


}

function obtenerPromedio(data) {

    let filtro = document.getElementById("txtFiltros").value;
    let promedio = document.getElementById("promedio").value;
    if (filtro != "nada") {

        let aux = data.reduce((prev, actual) => {
            return prev + parseInt(actual.precio);
        }, 0);
        return parseInt(promedio = aux / data.length);
    }
    else {
        return promedio = "N/A";
    }
}

function promPot(data) {

    let aux = data.reduce((prev, actual) => {
        return prev + parseInt(actual.potencia);
    }, 0);
    let promedioPot = aux / data.length;
    return parseInt(promedioPot);
}

function maximo(data) {

    let max = data.map(e => parseInt(e.precio)).reduce((prev, actual) => {
        return prev > actual ? prev : actual;
    });
    return max;
}

function minimo(data) {

    let min = data.map(e => parseInt(e.precio)).reduce((prev, actual) => {
        return prev < actual ? prev : actual;
    });
    return min;
}

function obtenerAnuncio(frm) {
    let titulo;
    let transaccion;
    let descripcion;
    let precio;
    let num_puertas;
    let num_KMs;
    let potencia;
    let id = -1;

    for (element of frm.elements) {
        switch (element.name) {
            case "titulo":
                titulo = element.value;
                break;
            case "transaccion":
                transaccion = element.value;
                break;
            case "descripcion":
                descripcion = element.value;
                break;
            case "precio":
                precio = element.value;
                break;
            case "num_puertas":
                num_puertas = element.value;
                break;
            case "num_KMs":
                num_KMs = element.value;
                break;
            case "potencia":
                potencia = element.value;
                break;
            case "idAnuncio":
                id = element.value;
                break;
        }
    }
    let f = new Date();
    let fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    return new Anuncio_Auto(id, titulo, transaccion, descripcion, precio, num_puertas, num_KMs, potencia, fecha);
}


function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    document.getElementById("idAnuncio").value = nodos[0].innerText;
    document.getElementById("idAnuncio").hidden = false;
    document.getElementById("lblId").hidden = false;
    document.getElementById("txtTitulo").value = nodos[1].innerText;
    document.getElementById("txtDescripcion").value = nodos[3].innerText;
    document.getElementById("numPrecio").value = nodos[4].innerText;
    document.getElementById("kms").value = nodos[6].innerText;
    document.getElementById("txtPotencia").value = nodos[7].innerText;
    document.getElementById("txtTransaccion").value = nodos[2].innerText;
    document.getElementById("txtPuertas").value = nodos[5].innerText;
    document.getElementById("btnBorrar").hidden = false;
    document.getElementById("btnCancelar").hidden = false;
    frm.removeEventListener('submit', manejadorSubmit);
    frm.addEventListener('submit', manejadorModificar);

}

function limpiarValues() {
    document.getElementById("idAnuncio").value = "";
    document.getElementById("idAnuncio").hidden = true;
    document.getElementById("lblId").hidden = true;
    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("numPrecio").value = "";
    document.getElementById("kms").value = "";
    document.getElementById("txtPuertas").value = "";
    document.getElementById("txtPotencia").value = "";
    document.getElementById("txtTransaccion").value = "nada";
    document.getElementById("btnCrearModificar").value = "Crear Anuncio";
    console.log(dataActual);
    document.getElementById("promedio").value = obtenerPromedio(dataActual);
    document.getElementById("pp").value = promPot(dataActual);
    document.getElementById("maximo").value = maximo(dataActual);
    document.getElementById("minimo").value = minimo(dataActual);
    document.getElementById("tresul").value = fechaUltimos(); 

}



///////////////////////// CREAR TABLA////////////////////////////////////

function crearTabla(array) {
    let tabla = document.createElement("table");
    let cabecera = document.createElement("tr");


    for (atributo in array[0]) {
        let th = document.createElement("th");
        th.textContent = atributo;
        cabecera.appendChild(th);
    }

    tabla.appendChild(cabecera);

    for (i in array) {
        let fila = document.createElement("tr");
        let objeto = array[i];

        for (j in objeto) {
            let celda = document.createElement("td");
            let dato = document.createTextNode(objeto[j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    tabla.classList.add("table");

    return tabla;
}


//////////////////////CRUD AXIOS//////////////////////////////////////////////////

function traerAnuncios() {
    document.getElementById("divTabla").innerHTML = "";
    document.getElementById('divTabla').innerHTML =
        '<img src="./img/208.gif" alt="spinner">';

    axios.get("http://localhost:3000/anuncios")
        .then((res) => {

            document.getElementById("divTabla").innerHTML = "";
            if (dataOriginal == null) {
                dataOriginal = res.data;
            }
            let dataFiltroTransaccion = filtroTransaccion(res.data);
            let dataFiltroCheks = filtroCheks(dataFiltroTransaccion);
            dataActual = dataFiltroCheks;
            fechaUltimos();
            document.getElementById("divTabla").appendChild(crearTabla(dataFiltroCheks));
        })
        .catch((err) => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            actualizarVista();
        });
}


function altaAnuncio(anuncio) {

    document.getElementById("divTabla").innerHTML = "";
    document.getElementById('divTabla').innerHTML =
        '<img src="./img/208.gif" alt="spinner">';

    const config = {
        method: "POST",
        headers: { "Content-type": "application/json;charset=utf-8" },
        data: JSON.stringify(anuncio)
    }

    axios("http://localhost:3000/anuncios", config)
        .then((res) => {
            console.log("Anuncio cargado con exito: \n\n", res.data);
        })
        .catch((err) => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            traerAnuncios();
        });
}


function modificarAnuncio(anuncio) {

    document.getElementById("divTabla").innerHTML = "";
    document.getElementById('divTabla').innerHTML =
        '<img src="./img/208.gif" alt="spinner">';

    const config = {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=utf-8" },
        data: JSON.stringify(anuncio)
    }

    axios("http://localhost:3000/anuncios/" + anuncio.id, config)
        .then((res) => {
            console.log("Anuncio modificado con exito: \n\n", res);
        })
        .catch((err) => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            traerAnuncios();
        });
}


function bajaAnuncio(anuncio) {

    anuncio = obtenerAnuncio(frm);

    if (window.confirm("DESEA ELIMINAR ESTE ANUNCIO??")) {

        document.getElementById("divTabla").innerHTML = "";
        document.getElementById('divTabla').innerHTML =
            '<img src="./img/208.gif" alt="spinner">';

        const config = {
            method: "DELETE",
            headers: { "Content-type": "application/json;charset=utf-8" },
        }

        axios("http://localhost:3000/anuncios/" + anuncio.id, config)
            .then((res) => {
                console.log("Anuncio borrado con exito: \n\n", res);
            })
            .catch((err) => {
                console.error(err.response.status, err.response.statusText);
            })
            .finally(() => {
                traerAnuncios();
            });
    }


}
//////////////////////FIN CRUD AXIOS//////////////////////////////////////////////////

//////////////////////LOCAL STORAGE/////////////////////////////////



function leerDatosLS(nombre) {

    return JSON.parse(localStorage.getItem(nombre));
}

function guardarDatosLS(nombre, array) {

    localStorage.setItem(nombre, JSON.stringify(array));
}

function actualizarDatosLS(nombre, array) {

    localStorage.removeItem(nombre);
    guardarDatosLS(nombre, array);
}

function borrarAlgoLS(nombre) {

    localStorage.removeItem(nombre);
}

function borrarTodoLS() {

    localStorage.clear();
}


//////////////////////////////////////////////////////////////////////////////////////

function cheksRemember() {
    if (!document.getElementById("cboxId").checked) {
        guardarDatosLS("id", false);
    } else {
        guardarDatosLS("id", true);
    }
    //     !document.getElementById("cboxTitulo").checked ||
    //     !document.getElementById("cboxTransaccion").checked ||
    //     !document.getElementById("cboxDescripcion").checked ||
    //     !document.getElementById("cboxPrecio").checked ||
    //     !document.getElementById("num_puertas").checked ||
    //     !document.getElementById("num_KMs").checked ||
    //     !document.getElementById("potencia").checked) {
    //     window.alert("Seleccione todas las columnas para realizar modificaciones!!");
    // }
}

function readCheksRemember() {
    if (leerDatosLS("id")) {
        document.getElementById("cboxId").checked;
    }
    //     !document.getElementById("cboxTitulo").checked ||
    //     !document.getElementById("cboxTransaccion").checked ||
    //     !document.getElementById("cboxDescripcion").checked ||
    //     !document.getElementById("cboxPrecio").checked ||
    //     !document.getElementById("num_puertas").checked ||
    //     !document.getElementById("num_KMs").checked ||
    //     !document.getElementById("potencia").checked) {
    //     window.alert("Seleccione todas las columnas para realizar modificaciones!!");
    // }
}

guardarDatosLS("vistos", [1, 3, 3, 1, 3, 1, 1, 8, 8, 4, 7, 7, 4, 4]);

function chart() {

    let vistos = leerDatosLS("vistos");
    let masVistos = [];

    let lb1 = 0;
    let lb2 = 0;
    let lb3 = 0;
    let lb4 = 0;
    let lb5 = 0;


    vistos.forEach(element => {
        switch (element) {
            case 1:
                lb1++;
                break;
            case 3:
                lb2++;
                break;
            case 4:
                lb3++;
                break;
            case 7:
                lb4++;
                break;
            case 8:
                lb5++;
                break;
            default:
                break;
        }
    });

    masVistos.push(lb1, lb2, lb3, lb4, lb5);
    console.log(masVistos);
    // guardarDatosLS("vistos", masVistos);

    new Chart(document.getElementById("chart"), {
        type: 'bar',
        data: {
            labels: ["1°", "2°", "3°", "4°", "5°"],
            datasets: [
                {
                    label: "Visitas",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: masVistos
                }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'ANUNCIOS MAS VISITADOS'
            }
        }
    });

}


function fechaUltimos() {

    let fechas = dataOriginal.map(e => e.fecha);

    console.log(fechas);
    var tres = fechas.sort(function (a, b) { return b > a; }).slice(0, 3);
    console.log(tres);
    return  JSON.stringify(tres);
    // document.getElementById("tresul").value = tres; 
}


