// Select DOM Elements
const searchBtn = document.getElementById("search-btn");
const movieInput = document.getElementById("movie-input");
const movieContainer = document.getElementById("movie-container");
const loadingSpinner = document.getElementById("loading-spinner");

// OMDb API Key
const apiKey = "5349e157";
let currentMovies = [];

// Search Button Event
searchBtn.addEventListener("click", () => {
    getMovieData();
});

// Press Enter to Search
movieInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        getMovieData();

    }

});

// Fetch Movie Data
async function getMovieData() {

    // Get movie name from input
    const movieName = movieInput.value.trim();

    if (movieName === "") {

    movieContainer.innerHTML = `
        <p class="error-message">
            Please enter a movie name.
        </p>
    `;

    return;
}

    // API URL
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;

    try {

        // Fetch data
        const response = await fetch(url);

        // Show loading spinner
        loadingSpinner.classList.remove("hidden");

        // Clear old content
        movieContainer.innerHTML = "";

        // Convert to JSON
        const data = await response.json();

        // Hide loading spinner
        loadingSpinner.classList.add("hidden");

        // Display movie on page
        if (data.Response === "False") {

    movieContainer.innerHTML = `
        <p class="error-message">
            Movie not found.
        </p>
    `;

    return;
}

currentMovies = data.Search;

displayMovies(currentMovies);
    } catch (error) {

    loadingSpinner.classList.add("hidden");

    movieContainer.innerHTML = `
        <p class="error-message">
            Something went wrong. Please try again.
        </p>
    `;

    console.log(error);

}
}

// Display Multiple Movies
function displayMovies(movies) {

    // Clear previous results
    movieContainer.innerHTML = "";

    // Loop through movie array
    movies.forEach((movie) => {

        movieContainer.innerHTML += `

            <div class="movie-card" onclick="getMovieDetails('${movie.imdbID}')">

                <img
                    src="${movie.Poster}"
                    alt="${movie.Title}"
                    class="movie-poster"
                />

                <div class="movie-info">

                    <h2 class="movie-title">
                        ${movie.Title}
                    </h2>

                    <p class="movie-year">
                        Year: ${movie.Year}
                    </p>

                </div>

            </div>

        `;
    });
}

// Fetch Full Movie Details
async function getMovieDetails(imdbID) {

    // API URL using IMDb ID
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    try {

        // Fetch full movie details
        const response = await fetch(url);

        // Convert to JSON
        const data = await response.json();

        // Display detailed movie view
        displayMovieDetails(data);

    } catch (error) {

        console.log(error);

    }
}

// Display Full Movie Details
function displayMovieDetails(movie) {

    movieContainer.innerHTML = `

        <div class="movie-details">

            <button class="back-btn" onclick="goBack()">
                ← Back to Results
            </button>

            <img
                src="${movie.Poster}"
                alt="${movie.Title}"
                class="details-poster"
            />

            <div class="details-info">

                <h2 class="details-title">
                    ${movie.Title}
                </h2>

                <p>
                    <strong>Year:</strong> ${movie.Year}
                </p>

                <p>
                    <strong>Genre:</strong> ${movie.Genre}
                </p>

                <p>
                    <strong>IMDb Rating:</strong> ${movie.imdbRating}
                </p>

                <p>
                    <strong>Actors:</strong> ${movie.Actors}
                </p>

                <p class="details-plot">
                    ${movie.Plot}
                </p>

            </div>

        </div>

    `;
}

// Go Back to Search Results
function goBack() {

    displayMovies(currentMovies);

}