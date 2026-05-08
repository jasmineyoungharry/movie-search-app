// Select DOM Elements
const searchBtn = document.getElementById("search-btn");
const movieInput = document.getElementById("movie-input");

// Your OMDb API Key
const apiKey = "5349e157";

// Search Button Event
searchBtn.addEventListener("click", () => {
    getMovieData();
});

// Fetch Movie Data
async function getMovieData() {

    // Get user input
    const movieName = movieInput.value;

    // API URL
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`;

    try {

        // Fetch data from API
        const response = await fetch(url);

        // Convert response to JSON
        const data = await response.json();

        // Display data in console
        console.log(data);

    } catch (error) {

        console.log("Error fetching movie data");

    }
}