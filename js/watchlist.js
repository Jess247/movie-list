const watchlistEl = document.querySelector(".watchlist")
const movies = JSON.parse(localStorage.getItem("movies"))
localStorage.clear()

renderWatchlist(movies)

function renderWatchlist(movies) {
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