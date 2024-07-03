const main = document.getElementById("main")
const button = document.getElementById("button")
const API = `https://dragonball-api.com/api/characters?limit=100`
const input = document.getElementById("input")
fetch(API)
    .then(response => response.json())
    // .then(json => console.log(json))
    .then(json => {
        // const guerrero = json.items["0"]
        guerrero = json.items

        // mostrarEnElDom(guerrero.name, guerrero.image, guerrero.ki)
    })
// .catch(error => console.error(`tiene un error: ${error}`))
const mostrarEnElDom = (nombre, imagen, ki, maxKi, historia) => {
    const div = document.createElement("div")
    const nombreDB = document.createElement("span")
    const imagenDB = document.createElement("img")
    const kiDB = document.createElement("span")
    const maxKiDB = document.createElement("span")
    const historiaDB = document.createElement("p")

    nombreDB.textContent = `Nombre: ${nombre}`
    imagenDB.src = imagen
    kiDB.textContent = `Su KI inicial es de ${ki}`
    //Mi hola mundo :(
    maxKiDB.textContent = `Su KI maximo es de ${maxKi}`
    historiaDB.textContent = `Historia: ${historia}`
    nombreDB.classList.add(`Nombre`)
    imagenDB.classList.add(`Imagen`)
    kiDB.classList.add(`Ki`)
    maxKiDB.classList.add(`MaxKi`)
    div.classList.add(`Div`)

    main.appendChild(nombreDB)
    main.appendChild(imagenDB)
    main.appendChild(kiDB)
    main.appendChild(maxKiDB)
    main.appendChild(div)
    main.appendChild(historiaDB)
    div.append(nombreDB, imagenDB, kiDB, maxKiDB, historiaDB)
}
// const buscarGuerrero = () => {
//     const input = document.getElementById("input")
//     for (let i = 0; i < guerrero.length; i++) {
//         const guerrerFor = guerrero[i];
//         if (guerrerFor == input.value) {
//             mostrarEnElDom(guerrerFor.name, guerrerFor.image, guerrerFor.ki)
//         }
//!Hola xd
//     }
// }

const buscarGuerrero = () => {
    main.innerHTML = " ";
    for (let i = 0; i < guerrero.length; i++) {
        const guerreroFor = guerrero[i];
        if (guerreroFor.name.toLowerCase() === input.value.toLowerCase()) {
            mostrarEnElDom(guerreroFor.name, guerreroFor.image, guerreroFor.ki, guerreroFor.maxKi, guerreroFor.description);
        }
    }
};
button.addEventListener("click", buscarGuerrero)
const historial = document.getElementById(`buttonHis`)

let historialDeBusqueda = [];

const añadirAlHistorial = () => {
    if (historialDeBusqueda.indexOf(input.value) === -1) {
        historialDeBusqueda.push(input.value)
    }
    console.log(historialDeBusqueda);

}

historial.addEventListener("click", añadirAlHistorial)

const ul = document.getElementById("historial")