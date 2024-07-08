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

const mostrarEnElDom = (nombre, imagen, ki, maxKi, historia) => {
 // const div = document.createElement("div");
  const script = document.createElement("script");

 /* div.innerHTML = `<div class="Div">*/
   main.innerHTML = `<div class="Div">

            <div class="divNombre"><span class="Nombre">${nombre}</span>
            <button>
            `+stringBotonFavorito()+`
            </button>
            <img src="${imagen}" class="Imagen">
            
            <div class="divKis">
                <span class="Ki">-Ki: ${ki}</span>
                <br>
                <span class="MaxKi">-Max Ki:${maxKi}</span>
            </div>
            
            </div>
            
            <div class="divHistoria">
                <p>${historia}</p>
            </div>
        </div>`;

 // main.appendChild(div);

  //!Carga dinamica de JS
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

function guardarBusqueda(guerrero) {
  if(!historialDeBusqueda.some(item => item[0] === guerrero.nombre))
    historialDeBusqueda.push(guerrero);
}

const mostrarHistorial = () => {
  const historialElement = document.getElementById("historial");
  historialElement.innerHTML = "";
  historialDeBusqueda.forEach(item => {
    //!Carga de la función
    const li = document.createElement("li");
    li.textContent = `Nombre: ${item.name}`;
    const img = document.createElement("img");
    img.src = item.imagen;
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