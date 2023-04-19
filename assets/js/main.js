const botonEncriptar = document.querySelector("#BEncriptar");
const botonDesencriptar = document.querySelector("#BDesencriptar");
const divEncriptar = document.querySelector("#div_campo_encriptar");
const divDesencriptar = document.querySelector("#div_campo_desencriptar");
const textoEncriptar = document.querySelector("#encriptar");
const textoDesencriptar = document.querySelector("#desencriptar");
const mensaje = document.querySelector("#mensaje");
const contenedorVacio = document.querySelector(".encriptado-vacio");
const contenedorTextoCopiar = document.querySelector(".encriptado-texto");
const botonCopiar = document.querySelector(".boton");

const mostrar = () => {
    if (textoEncriptar.value !== "" || textoDesencriptar.value !== "") {
        contenedorVacio.classList.add("none");
        contenedorVacio.classList.remove("flex");
        contenedorTextoCopiar.classList.remove("none");
        contenedorTextoCopiar.classList.add("flex");
    } else {
        contenedorVacio.classList.remove("none");
        contenedorVacio.classList.add("flex");
        contenedorTextoCopiar.classList.add("none");
        contenedorTextoCopiar.classList.remove("flex");
    }
}

const validarDatos = () => {
    const evento = window.event;
    if (evento.charCode >= " ".charCodeAt() && evento.charCode <= ".".charCodeAt()
        || evento.charCode === ",".charCodeAt()
        || evento.charCode > "`".charCodeAt() && evento.charCode < "{".charCodeAt()
        || evento.charCode === "ñ".charCodeAt() || evento.charCode === 13) {
        return true;
    }
    else {
        alert("¡Error!, por favor lee la advertencia");
        return false;
    }
}

const encriptar = (e) => {
    let textoEncriptado = "";
    let cadenaCaracteres = [];
    let cadena = e.target.value;
    let cadenaMinuscula = cadena.toLowerCase();

    for (let i = 0; i <= cadenaMinuscula.length; i++) {
        if (cadenaMinuscula[i] == "a" || cadenaMinuscula[i] == "á") {
            cadenaCaracteres[i] = "ai";
        } else if (cadenaMinuscula[i] == "e" || cadenaMinuscula[i] == "é") {
            cadenaCaracteres[i] = "enter";
        } else if (cadenaMinuscula[i] == "i" || cadenaMinuscula[i] == "í") {
            cadenaCaracteres[i] = "imes";
        } else if (cadenaMinuscula[i] == "o" || cadenaMinuscula[i] == "ó") {
            cadenaCaracteres[i] = "ober";
        } else if (cadenaMinuscula[i] == "u" || cadenaMinuscula[i] == "ú") {
            cadenaCaracteres[i] = "ufat";
        } else {
            cadenaCaracteres[i] = cadenaMinuscula[i];
        }
        textoEncriptado = cadenaCaracteres.join("");
    }

    mensaje.value = textoEncriptado;
    mostrar();
}

const desencriptar = (e) => {
    let cadena = e.target.value;

    for (let x = 0; x <= cadena.length; x++) {
        if (cadena.includes("ai")) {
            cadena = cadena.replace("ai", "a")
        } else if (cadena.includes("enter")) {
            cadena = cadena.replace("enter", "e")
        } else if (cadena.includes("imes")) {
            cadena = cadena.replace("imes", "i")
        } else if (cadena.includes("ober")) {
            cadena = cadena.replace("ober", "o")
        } else if (cadena.includes("ufat")) {
            cadena = cadena.replace("ufat", "u")
        }
    }
    mensaje.value = cadena;
    mostrar();
}

const copiar = () => {
    let textoCopiado = mensaje;
    if (!navigator.clipboard) {
        textoCopiado.select();
        document.execCommand("copy");
        textoEncriptar.value = "";
    } else {
        navigator.clipboard.writeText(textoCopiado.value);
        textoEncriptar.value = "";
        textoDesencriptar.value = "";
    }
}

const accion = () => {
    if (botonEncriptar.classList.contains("seleccionado")) {
        textoEncriptar.addEventListener('input', encriptar);
        divEncriptar.classList.add("encriptador-campo");
        divEncriptar.classList.remove("none");

        divDesencriptar.classList.remove("encriptador-campo");
        divDesencriptar.classList.add("none");
        textoEncriptar.onkeypress = validarDatos;
    } else {
        textoDesencriptar.addEventListener('input', desencriptar);
        divDesencriptar.classList.add("encriptador-campo");
        divDesencriptar.classList.remove("none");

        divEncriptar.classList.remove("encriptador-campo");
        divEncriptar.classList.add("none");
        textoDesencriptar.onkeypress = validarDatos;
    }

    mostrar();
}

const seleccionarEncriptar = () => {
    botonEncriptar.classList.add("seleccionado");
    botonDesencriptar.classList.remove("seleccionado");

    accion();
}

const seleccionarDesencriptar = () => {
    botonEncriptar.classList.remove("seleccionado");
    botonDesencriptar.classList.add("seleccionado");

    accion();
}

accion();
botonEncriptar.addEventListener('click', seleccionarEncriptar);
botonDesencriptar.addEventListener('click', seleccionarDesencriptar);
botonCopiar.addEventListener('click', copiar);