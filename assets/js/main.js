const encriptado = document.querySelector("#encriptado");
const textoEncriptar = document.querySelector("#encriptar");
const boton = document.querySelector("#boton");


const Encriptar = () => {
    let textoEncriptado = "";
    let cadena = textoEncriptar.value;
    let cadenaCaracteres = [];

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
}

const Desencriptar = (texto) => {
    let cadena = texto.value;
    let temporal = "";

    for (let x of cadena) {
        temporal += x
        if (temporal.includes("ai")) {
            temporal = temporal.replace("ai", "a")
        } else if (temporal.includes("enter")) {
            temporal = temporal.replace("enter", "e")
        } else if (temporal.includes("imes")) {
            temporal = temporal.replace("imes", "i")
        } else if (temporal.includes("ober")) {
            temporal = temporal.replace("ober", "o")
        } else if (temporal.includes("ufat")) {
            temporal = temporal.replace("ufat", "u")
        }
    }
    encriptado.value = temporal;
}


textoEncriptar.onkeyup = Encriptar;