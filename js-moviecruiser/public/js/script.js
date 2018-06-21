let movies = [];
let favourites = [];
let moviesURL = 'http://localhost:3000/movies';
let favURL = 'http://localhost:3000/favourites';


/* Function to return movies */
function listMovies() {
	let movHtml = movies.map(elem => {
		return `<li>
		<div class="row">
		<div class="col-12 col-md-6">
		<img src="${elem.posterPath}"  class="img-response img-thumbnail" src="${elem.posterPath}"/>
		</div>
		<div class="col-12 col-md-6">
		<div><h4> ${elem.title} </h4></div>
		<div class="desc"> ${elem.overview} </div>
		<div><button onclick="addFavourite(${elem.id})" type="button" 
		class="btn btn-success">Favourite</button></div>
		</div>
		</div>
		</li>`;
		});
	let mov = document.getElementById('moviesList');
	mov.innerHTML = movHtml;
}
/* Function to get list of movies */
function getMovies() {
	return fetch(moviesURL)
	.then(response => response.json())
	.then(resp => {
		movies = resp;
		listMovies();
		return resp;
	})
	.catch((err)=> { throw new Error(err); });
}


/* Function to return favourites */
function listFavourites() {
	let favHtml = favourites.map(elem => {
		return `<li>
		<div class="row">
		<div class="col-12 col-md-6">
		<img src="${elem.posterPath}"  class="img-response" src="${elem.posterPath}"/>
		</div>
		<div class="col-12 col-md-6">
		<div><h4> ${elem.title} </h4></div>
		<div class="desc"> ${elem.overview} </div>
		</div>
		</div>
		</li>`;
		});
	let fav = document.getElementById('favouritesList');
	fav.innerHTML = favHtml;
}

/* Function to get list of favourites */
function getFavourites() {
return fetch(favURL)
	.then(response => response.json())
	.then(resp => {
		favourites = resp;
		listFavourites();
	return resp;
})
.catch((err)=> { throw new Error(err); });
}


/* Function to add favourite from ID */
function addFavourite(id) {
let mov = movies.filter(m => {
    return m.id === id;
  });
let fav = favourites.filter(f => {
    return f.id === id;
  });
	 if(fav.length > 0) {
		throw new Error('Movie is already added to favourites');
	}
	else {
		return fetch(favURL, {
			method: 'POST',
			body: JSON.stringify(mov[0]),
			headers: { 'Content-Type': 'application/json' }
		}).then(function(response) {
			return response.json();
		}).then(function(fav1) {
			favourites.push(fav1);
			listFavourites();
			return favourites;
		});
	}
}
	

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};
// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution