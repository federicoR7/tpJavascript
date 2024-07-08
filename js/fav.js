checkFav =  document.getElementById("favorite");

marcarFavorito = () => {
   const index = favoritos.findIndex(fav => fav.nombre === currentGuerrero.nombre);
   if (index === -1) {
      favoritos.push(currentGuerrero);
   } else {
      favoritos.splice(index, 1);
   }
   cardFavs.innerHTML = '';
   if(favoritos.length == 0){
      cardFavs.innerHTML = emptyFavs;
   } else{
      favoritos.forEach(fav => {
         cardFavs.innerHTML += `<div class="card card-favorito">
                  <img class="imgFav" src="${fav.imagen}" alt="${fav.nombre}" class="card-img-top">
                  <p class="card-name">${fav.nombre}</p>
               </div>`;
      });
   }
   
};

checkFav.addEventListener("click", marcarFavorito);