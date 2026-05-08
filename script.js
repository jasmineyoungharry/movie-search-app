// Select DOM Elements
const searchBtn = document.getElementById("search-btn");
const movieInput = document.getElementById("movie-input");
const movieContainer = document.getElementById("movie-container");
const loadingSpinner = document.getElementById("loading-spinner");
const favoritesBtn = document.getElementById("favorites-btn");

// OMDb API Key
const apiKey = "5349e157";

// Store Current Search Results
let currentMovies = [];

// Store Favorites
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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

// Open Favorites
favoritesBtn.addEventListener("click", () => {

    displayFavorites();

});

// Fetch Movie Data
async function getMovieData() {

    // Get movie name
    const movieName = movieInput.value.trim();

    // Empty Validation
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

        // Show Spinner
        loadingSpinner.classList.remove("hidden");

        // Clear old content
        movieContainer.innerHTML = "";

        // Fetch Data
        const response = await fetch(url);

        // Convert to JSON
        const data = await response.json();

        // Hide Spinner
        loadingSpinner.classList.add("hidden");

        // Handle Invalid Movies
        if (data.Response === "False") {

            movieContainer.innerHTML = `
                <p class="error-message">
                    Movie not found.
                </p>
            `;

            return;
        }

        // Save Current Movies
        currentMovies = data.Search;

        // Display Movies
        displayMovies(currentMovies);

    } catch (error) {

        // Hide Spinner
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

    // Clear container
    movieContainer.innerHTML = "";

    // Loop through movies
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

    // API URL
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    try {

        // Fetch Data
        const response = await fetch(url);

        // Convert to JSON
        const data = await response.json();

        // Display Movie Details
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

                <button
                    class="favorite-btn"
                    onclick='addToFavorites(${JSON.stringify(movie)})'
                >
                     Add to Favorites
                </button>

            </div>

        </div>

    `;
}

// Go Back to Results
function goBack() {

    displayMovies(currentMovies);

}

// Add Movie to Favorites
function addToFavorites(movie) {

    // Check for duplicates
    const alreadyFavorite = favorites.some(
        (fav) => fav.imdbID === movie.imdbID
    );

    if (alreadyFavorite) {

        alert("Movie already in favorites.");

        return;
    }

    // Add movie
    favorites.push(movie);

    // Save to localStorage
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert("Movie added to favorites!");

}

// Display Favorites
function displayFavorites() {

    // Check if empty
    if (favorites.length === 0) {

        movieContainer.innerHTML = `
            <p class="error-message">
                No favorite movies yet.
            </p>
        `;

        return;
    }

    // Clear container
    movieContainer.innerHTML = "";

    // Loop through favorites
    favorites.forEach((movie) => {

        movieContainer.innerHTML += `

            <div class="movie-card">

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

                    <button
                        class="remove-btn"
                        onclick="removeFavorite('${movie.imdbID}')"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;
    });

}

// Remove Favorite
function removeFavorite(imdbID) {

    // Remove from array
    favorites = favorites.filter(
        (movie) => movie.imdbID !== imdbID
    );

    // Update localStorage
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    // Refresh favorites
    displayFavorites();

}