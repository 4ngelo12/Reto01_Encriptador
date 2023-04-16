const botonEncriptar = document.querySelector("#BEncriptar");
const botonDesencriptar = document.querySelector("#BDesencriptar");
const textoEncriptar = document.querySelector("#encriptar");
const encriptado = document.querySelector("#encriptado");
const contenedorVacio = document.querySelector(".encriptado-vacio");
const contenedorTextoCopiar = document.querySelector(".encriptado-texto");
const botonCopiar = document.querySelector(".boton");
const botonEnc = document.querySelector("#botonE");
let validacion = true;

const mostrar = () => {
    if (textoEncriptar.value !== "") {
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
        || evento.charCode === "ñ".charCodeAt()) {
        validacion = true;
    }
    else {
        alert("¡Error!, por favor lee la advertencia");
        validacion = false;
    }
}

const encriptar = (e) => {
    let textoEncriptado = "";
    let cadena = e.target.value;
    let cadenaCaracteres = [];
    let cadenaMinuscula = cadena.toLowerCase();
    console.log(cadenaMinuscula.charCode);

    if (validacion) {
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
        encriptado.value = textoEncriptado;
        console.log(textoEncriptado);

        mostrar();
    }
}

const Desencriptar = (e) => {
    let cadena = e.target.value;

    if (validacion) {
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
            encriptado.value = cadena;
            mostrar(encriptado);
        }
    }
}

const accion = () => {
    if (botonEncriptar.className == "seleccionado") {
        textoEncriptar.addEventListener('input', encriptar);
    } if (botonDesencriptar.className == "seleccionado") {
        textoEncriptar.addEventListener('input', Desencriptar);
    }

    encriptado.value = "";
    mostrar();
}

const copiar = () => {
    let textoCopiado = encriptado;
    if (!navigator.clipboard) {
        textoCopiado.select();
        document.execCommand("copy");
        textoEncriptar.value = "";
    } else {
        navigator.clipboard.writeText(textoCopiado.value);
        textoEncriptar.value = "";
    }
    
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


botonEncriptar.addEventListener('click', seleccionarEncriptar);
botonDesencriptar.addEventListener('click', seleccionarDesencriptar);
botonCopiar.addEventListener('click', copiar);
textoEncriptar.onkeypress = validarDatos;

accion();