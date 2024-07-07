const main = document.getElementById("main");
const buttonBuscar = document.getElementById("button");
const buttonHist = document.getElementById("buttonHis");
const buttonFav = document.getElementById("buttonFav");
const API = `https://dragonball-api.com/api/characters?limit=100`;
const input = document.getElementById("input");
const emptyFavs = `
      <div class="col-6 col-sm-4" id="card-favs">
        <div class="card card-favorito">
          <p>No hay favoritos</p>
        </div>
      </div>
    `;

let currentGuerrero;

// Utilizados en fav.js, usar solo let, no const
let checkFav;
let marcarFavorito;
let favoritos = [];
let cardFavs = document.getElementById("card-favs");

fetch(API)
  .then(response => response.json())
  .then(json => {
    guerrero = json.items;
  });

    // mostrarEnElDom(guerrero.name, guerrero.image, guerrero.ki)
  })
// .catch(error => console.error(`tiene un error: ${error}`))

const mostrarEnElDom = (nombre, imagen, ki, maxKi, historia) => {
  const div = document.createElement("div");
  const nombreDB = document.createElement("span");
  const imagenDB = document.createElement("img");
  const kiDB = document.createElement("span");
  const maxKiDB = document.createElement("span");
  const historiaDB = document.createElement("p");
  const fav = document.createElement("button");

  nombreDB.textContent = `Nombre: ${nombre}`;
  fav.innerHTML = stringBotonFavorito();
  imagenDB.src = imagen
  kiDB.textContent = `Su KI inicial es de ${ki}`
  //Mi hola mundo :(
  maxKiDB.textContent = `Su KI maximo es de ${maxKi}`
  historiaDB.textContent = `Historia: ${historia}`

  //!Clases📌
  // fav.classList.add('buttonHisBox')
  nombreDB.classList.add(`Nombre`)
  imagenDB.classList.add(`Imagen`)
  kiDB.classList.add(`Ki`)
  maxKiDB.classList.add(`MaxKi`)
  div.classList.add(`Div`)
  divKis.classList.add('divKis')
  divHistoria.classList.add('divHistoria')
  divNombre.classList.add("divNombre")

  //!Ponerlo en el DOM📌
  divNombre.append(nombreDB)
  main.appendChild(divKis)
  main.appendChild(imagenDB)
  main.appendChild(div)
  main.appendChild(historiaDB)
  divKis.append(kiDB, maxKiDB)
  divHistoria.append(historiaDB)
  div.append(divNombre, imagenDB, fav, divKis, divHistoria)

  //Carga dinamica de JS
  script.src = './js/fav.js';
  script.defer = true;
  document.head.appendChild(script);
}

let historialDeBusqueda = [];
const buscarGuerrero = () => {
  main.innerHTML = "";

  if (input.value.trim() === "") {
    alert("Por favor, ingrese un personaje de Dragon Ball Z");
    input.value = "";
  } else {
    for (const elegido of guerrero) {
      if (elegido.name.toLowerCase() === input.value.toLowerCase()) {
        mostrarEnElDom(elegido.name, elegido.image, elegido.ki, elegido.maxKi, elegido.description);
        currentGuerrero = new Guerrero(elegido.name, elegido.image);
        guardarBusqueda(currentGuerrero);

        const botonFav = document.getElementById("favorite");
        const index = favoritos.findIndex(fav => fav.nombre === currentGuerrero.nombre);
        if (index === -1) {
            botonFav.removeAttribute("checked");
        } else {
            botonFav.setAttribute("checked", true);
        }
      }
    }
  }
};

function guardarBusqueda(name, image) {
  if (!historialDeBusqueda.some(item => item[0] === name)) {
    historialDeBusqueda.push([name, image]);
  }
}

const mostrarHistorial = () => {
  const historialElement = document.getElementById("historial");
  historialElement.innerHTML = "";
  historialDeBusqueda.forEach(item => {
    //!Carga de la función
    const li = document.createElement("li");
    li.textContent = `Nombre: ${item[0]}`;
    const img = document.createElement("img");
    img.src = item[1];
    img.style.height = "50px";
    img.style.widows = "50px";
    li.appendChild(img);
    historialElement.appendChild(li);
  });
};

buttonBuscar.addEventListener("click", buscarGuerrero);
buttonHist.addEventListener("click", mostrarHistorial);

const mostrarFavoritos = () => {
  let fav = document.getElementById(`favoritos`);
  fav.classList.toggle(`hidden`);

  if (favoritos.length == 0)
    cardFavs.innerHTML = emptyFavs;
}

buttonFav.addEventListener("click", mostrarFavoritos);

function stringBotonFavorito() {
  return `
    <input
      value="favorite-button"
      name="favorite-checkbox"
      id="favorite"
      type="checkbox"
    />
    <label class="container" for="favorite">
      <svg
        class="feather feather-heart"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        ></path>
      </svg>
    </label>
  `;
}
