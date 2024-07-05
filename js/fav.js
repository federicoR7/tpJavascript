buttonFav =  document.getElementById("favorite");
marcarFavorito = () => {
if (favoritos.indexOf(input.value) === -1)
   favoritos.push(input.value);
else
   favoritos.splice(favoritos.indexOf(input.value), 1);

console.log(favoritos);
};

buttonFav.addEventListener("click", marcarFavorito);