const botonEncriptar = document.querySelector("#BEncriptar");
const botonDesencriptar = document.querySelector("#BDesencriptar");
const textoEncriptar = document.querySelector("#encriptar");
const encriptado = document.querySelector("#encriptado");
const contenedorVacio = document.querySelector(".encriptado-vacio");
const contenedorTextoCopiar = document.querySelector(".encriptado-texto");
const botonCopiar = document.querySelector(".boton");
let validacion = false;


const mostrar = (texto) => {
    if (texto.value !== "") {
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

const accion = () => {
    if (botonEncriptar.className == "seleccionado") {
        textoEncriptar.onkeyup = encriptar;
    } if (botonDesencriptar.className == "seleccionado") {
        textoEncriptar.onkeyup = Desencriptar;
    }

    encriptado.value = "";
    mostrar(textoEncriptar);
}

const seleccionarEncriptar = () => {
    botonEncriptar.classList.add("seleccionado");
    botonDesencriptar.classList.remove("seleccionado");

    accion();
}

const seleccionarDesencriptar = () => {
    botonEncriptar.classList.remove("seleccionado");
    botonDesencriptar.classList.add("seleccionado");

    accion()
}

const validarDatos = () => {
    const evento = window.event;
    if (evento.charCode >= " ".charCodeAt() && evento.charCode <= ".".charCodeAt()
        || evento.charCode === ",".charCodeAt()
        || evento.charCode > "@".charCodeAt() && evento.charCode <= "[".charCodeAt()
        || evento.charCode > "`".charCodeAt() && evento.charCode < "{".charCodeAt()
        || evento.charCode === "Ñ".charCodeAt() || evento.charCode === "ñ".charCodeAt()) {

        return validacion = true;
    }
    else {
        alert("¡Error!, por favor lee la advertencia");
        return validacion = false;
    }
}

const encriptar = () => {
    let textoEncriptado = "";
    let cadena = textoEncriptar.value;
    let cadenaCaracteres = [];

    if (validacion) {
        for (let i = 0; i <= cadena.length; i++) {
            switch (cadena[i]) {
                case "a":
                    cadenaCaracteres[i] = "ai";
                    break;
                case "e":
                    cadenaCaracteres[i] = "enter";
                    break;
                case "i":
                    cadenaCaracteres[i] = "imes";
                    break;
                case "o":
                    cadenaCaracteres[i] = "ober";
                    break;
                case "u":
                    cadenaCaracteres[i] = "ufat";
                    break;
                default:
                    cadenaCaracteres[i] = cadena[i];
                    break;
            }
            textoEncriptado = cadenaCaracteres.join("");
        }
        encriptado.value = textoEncriptado;
        mostrar(encriptado);
    }
}

const Desencriptar = () => {
    let cadena = textoEncriptar.value;

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

const copiar = () => {
    let textoCopiado = encriptado.value;
    navigator.clipboard.writeText(textoCopiado);
    textoEncriptar.value = "";
}

botonEncriptar.onclick = seleccionarEncriptar;
botonDesencriptar.onclick = seleccionarDesencriptar;
textoEncriptar.onkeypress = validarDatos;
botonCopiar.onclick = copiar;

accion();