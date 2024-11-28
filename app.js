let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior'); //navegación entre peliculas
const btnSiguiente = document.getElementById('btnSiguiente');
 
btnSiguiente.addEventListener('click', () => {  //esta condicional declara que te va a enviar a la pagina siguiente siempre y cuando haya menor a 1000
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => { //retrocede siempre y cuando la hoja no sea menor a 1 
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});
// función asíncrona que carga las películas desde la API
const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3eca48640bcd32b615e835cdd42148d3&language=es-MX&page=${pagina}`); //Aqui se encuentra la conxión a la API
	
		console.log(respuesta);

		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){            // código 401 error de autenticación (clave de API incorrecta)
			console.log('Llave incorrecta verifica nuevamente en el código');
		} else if(respuesta.status === 404){
			  // código 404 no se encontraron recursos (página o recurso no existente)
			console.log('Esta pelicula que buscas no existe');
		} else {
			console.log('Error inesperado comunicate con el administrador');
		}

	} catch(error){
		console.log(error);
	}

}
cargarPeliculas();