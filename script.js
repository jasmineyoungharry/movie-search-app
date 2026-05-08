// Select DOM Elements
const searchBtn = document.getElementById("search-btn");
const movieInput = document.getElementById("movie-input");
const movieContainer = document.getElementById("movie-container");

// OMDb API Key
const apiKey = "5349e157";

// Search Button Event
searchBtn.addEventListener("click", () => {
    getMovieData();
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
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`;

    try {

        // Fetch data
        const response = await fetch(url);

        // Convert to JSON
        const data = await response.json();

        // Display movie on page
        if (data.Response === "False") {

    movieContainer.innerHTML = `
        <p class="error-message">
            Movie not found.
        </p>
    `;

    return;
}

displayMovie(data);

    } catch (error) {

        movieContainer.innerHTML = `
    <p class="error-message">
        Something went wrong. Please try again.
    </p>
`;

console.log(error);
    }
}

// Display Movie Function
function displayMovie(movie) {

    movieContainer.innerHTML = `
    
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

                <p class="movie-rating">
                    IMDb Rating: ${movie.imdbRating}
                </p>

                <p class="movie-plot">
                    ${movie.Plot}
                </p>

            </div>

        </div>

    `;
}