// Titles: https://omdbapi.com/?s=thor&page=1&apikey=424184a5
// details: http://www.omdbapi.com/?i=tt3896198&apikey=424184a5

let movieSearchBox =document.getElementById('movie_search_box');
let searchList =document.getElementById('search_list');
let resultGrid =document.getElementById('result_grid');
//creating a function to fetch the movies from the ombd api
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //printing movie data in console to test
    //console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}
//testing function
//loadMovies('Spiderman');
//funvtion that searches the movie and implements the hide_search_list function when clicking on the seach bar
function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    //console.log(searchTerm);
    if (searchTerm.length >0){
        searchList.classList.remove('hide_search_list');
        loadMovies(searchTerm);
    }else{
        searchList.classList.add('hide_search_list');
    }

}
//this function will be run when selecting a film in order to display it. IF there is no poster an default placeholder image will be used

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        //console.log(movieListItem);
        movieListItem.dataset.id= movies[idx].imdbID;
        movieListItem.classList.add("search_list_item");
        if(movies[idx].Poster != "N/A")
            moviePoster= movies[idx].Poster;
        else
        moviePoster= "imagenotfound.jpg";
        //adding htmm and replacing values with our variables from the omdb api
        movieListItem.innerHTML = `
        <div class="search_list_thumb">
            <img src ="${moviePoster}">
        </div>
        <div class = "search_item_info">
            <h3> ${movies[idx].Title}</h3>
            <p> ${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
loadMovieDetails()
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search_list_item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            //the console.log was used to see if the films get loaded
            // console.log(movie.dataset.id);
            searchList.classList.add('hide_search_list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=424184a5`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            //once again console.log was used to see if the movie details get printed in the cosole.
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    //adding htmm and replacing movie details with our variables from the omdb api
    resultGrid.innerHTML =`<div class = "movie_poster">
    <img src=${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt= "Movie_Poster">
</div>
<div class="movie_info">
    <h3 class = "movie_title">${details.Title}</h3>
    <ul class="movie_info_misc">
        <li class="year">${details.Year}</li>
        <li class="rated">${details.Rated}</li>
        <li class="released">${details.Released}</li>
    </ul>
    <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
    <p class = "writer"><b>Writer:</b>${details.Writer}</p>
    <p class = "actors"><b>Actors:</b>${details.Actors}</p>
    <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
    <p class = "language"><b>Language:</b> ${details.Language}</p>
    <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
</div>`
}
//this event listenr will be our on click function to hide or display the search bar.
window.addEventListener('click', (event) => {
    if(event.target.className != "form_control"){
        searchList.classList.add('hide_search_list');
    }
});