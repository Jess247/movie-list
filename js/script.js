const searchField = document.querySelector("#searchfield")
const searchBtn = document.querySelector("#search-btn")
const movieResults =  document.querySelector(".movie-results")

searchBtn.addEventListener("click", () => {
    if(searchField.value === "") {
        return
    } else {
        fetch (`http://www.omdbapi.com/?&apikey=276924e5&s=${searchfield.value}`)
            .then(res => res.json())
            .then(data => {
                render(data.Search)
            })
    }
}) 

function render(movies) {
    let movieEl = ""
    movies.forEach((movie) => {
        fetch(`http://www.omdbapi.com/?&apikey=276924e5&t=${movie.Title}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                movieResults.innerHTML += `
                <div class="movie">
                    <img src="${data.Poster}" alt="Movie cover">
                    <div class="grid">
                        <h2>${data.Title}</h2>
                        <p class="rating"><i class="fa-solid fa-star"></i> ${data.imdbRating}</p>
                        <p class="length">${data.Runtime}</p>
                        <p class="genre">${data.Genre}</p>
                        <button class="add-movie-btn"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                        <p class="description">${data.Plot}</p>
                    </div>
                </div>`
            })
    })

}

