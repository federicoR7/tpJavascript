const main = document.getElementById("main");
const buttonBuscar = document.getElementById("button");
const buttonHist = document.getElementById("buttonHis");
const buttonFav = document.getElementById("buttonFav");
const API = `https://dragonball-api.com/api/characters?limit=100`;
const input = document.getElementById("input");
let currentGuerrero = [];
let historialDeBusqueda = [];

// Utilizados en fav.js, usar solo let, no const
let checkFav;
let marcarFavorito;
let favoritos = [];

fetch(API)
  .then(response => response.json())
  .then(json => {
    guerrero = json.items;
  });

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
  imagenDB.src = imagen;
  kiDB.textContent = `Su KI inicial es de ${ki}`;
  maxKiDB.textContent = `Su KI maximo es de ${maxKi}`;
  historiaDB.textContent = `Historia: ${historia}`;

  nombreDB.classList.add("Nombre");
  imagenDB.classList.add("Imagen");
  kiDB.classList.add("Ki");
  maxKiDB.classList.add("MaxKi");
  div.classList.add("Div");

  div.append(nombreDB, imagenDB, fav, kiDB, maxKiDB, historiaDB);
  main.appendChild(div);

  guardarBusqueda(nombreDB.textContent, imagenDB.src);
};

const buscarGuerrero = () => {
  main.innerHTML = "";

  if (input.value.trim() === "") {
    alert("Por favor, ingrese un personaje de Dragon Ball Z");
    input.value = "";
  } else {
    for (const elegido of guerrero) {
      if (elegido.name.toLowerCase() === input.value.toLowerCase()) {
        mostrarEnElDom(elegido.name, elegido.image, elegido.ki, elegido.maxKi, elegido.description);
        currentGuerrero = [elegido.name, elegido.image];
        console.log(currentGuerrero);
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
  let fav = document.getElementById("divFavoritos");
  fav.toggleAttribute("hidden");
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
