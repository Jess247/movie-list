const watchlistEl = document.querySelector(".watchlist")
const emptyEl = document.querySelector(".empty")
let movies = JSON.parse(localStorage.getItem("movies"))

document.addEventListener("click", (e) => {
    const movieId = e.target.dataset.id
    
    if(movieId) {
        movies.splice(movies.findIndex((movie) => movie.imdbID === movieId),1)
        localStorage.setItem("movies",JSON.stringify(movies))
        JSON.parse(localStorage.getItem("movies"))
        console.log(movies)
        renderWatchlist(movies)
    }
})

renderWatchlist(movies)

function renderWatchlist(movies) {
    if(movies.length === 0) {
        emptyEl.classList.remove("hidden")
    } else {
        emptyEl.classList.add("hidden")
        watchlistEl.innerHTML = ""
        movies.forEach((movie) => {
            watchlistEl.innerHTML += `
            <div class="movie">
                <img src="${movie.Poster}" alt="Movie cover">
                <div class="grid">
                    <h2>${movie.Title}</h2>
                    <p class="rating"><i class="fa-solid fa-star"></i> ${movie.imdbRating}</p>
                    <p class="runtime">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <button class="btn" data-id="${movie.imdbID}"><i class="fa-solid fa-circle-minus"></i> Watchlist</button>
                    <p class="plot">${movie.Plot}</p>
                </div>
            </div>`
        })
    }
}