checkFav =  document.getElementById("favorite");
tablaFav = document.getElementById("tablaFavoritos");
marcarFavorito = () => {

   console.log(currentGuerrero);
   if (favoritos.indexOf(currentGuerrero.name) === -1)
      favoritos.push(currentGuerrero);
   else
      favoritos.splice(favoritos.indexOf(currentGuerrero.name), 1);

   tablaFav.innerHTML = ``;
   console.log(favoritos);
   for(fav of favoritos){
      tablaFav.innerHTML += `<tr><td>${fav.name}</td><td>${fav.image}</td></tr>`;
   }
};

checkFav.addEventListener("click", marcarFavorito);