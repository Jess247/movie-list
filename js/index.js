const searchField = document.querySelector("#searchfield")
const searchBtn = document.querySelector("#search-btn")
const movieResults =  document.querySelector(".movie-results")
const emptyListEl = document.querySelector(".empty")
export const watchlist = []


document.addEventListener("click", (e) =>{
    const movieId = e.target.dataset.id
    if(movieId) {
        fetch(`http://www.omdbapi.com/?&apikey=276924e5&i=${movieId}`)
            .then(res => res.json())
            .then(movie => {
                console.log(movie)

                watchlist.push(movie)
                localStorage.setItem("movies",JSON.stringify(watchlist))
            })
        
    }
    if(e.target.id === "search-btn") {
        if(searchField.value === "") {
            return
        } else {
            fetch (`http://www.omdbapi.com/?&apikey=276924e5&s=${searchfield.value}`)
                .then(res => res.json())
                .then(data => {
                    if(data.Response === "True") {
                        renderSearch(data.Search)
                        searchField.value = ""
                    } else {
                        movieResults.innerHTML = `
                        <p class="empty">Unable to find what you're looking for. Please try another search.</p>`
                    }
                    
                })
        }
    }
})


function renderSearch(movies) {
    let movieEl = ""
    movies.forEach((movie) => {
        fetch(`http://www.omdbapi.com/?&apikey=276924e5&t=${movie.Title}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                emptyListEl.classList.add("hidden")
                movieResults.innerHTML += `
                <div class="movie">
                    <img src="${data.Poster}" alt="Movie cover">
                    <div class="grid">
                        <h2>${data.Title}</h2>
                        <p class="rating"><i class="fa-solid fa-star"></i> ${data.imdbRating}</p>
                        <p class="runtime">${data.Runtime}</p>
                        <p class="genre">${data.Genre}</p>
                        <button class="btn" data-id="${data.imdbID}"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                        <p class="plot">${data.Plot}</p>
                    </div>
                </div>`
            })
    })
}

