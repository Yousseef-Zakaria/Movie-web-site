const Base_URL = "https://api.themoviedb.org/3";
const Search_URL =` ${Base_URL}/search/movie?query=`;
const img_URL = `https://image.tmdb.org/t/p/w500`;

function formatString(input) {
    // إزالة المسافات من البداية والنهاية
    let trimmed = input.trim();
    // استبدال المسافات في المنتصف بعلامة +
    let formatted = trimmed.replace(/\s+/g, '+');
    return formatted;
}
let getDetails = (movie) =>{
    localStorage.setItem("selectedMovieForDetails" , String(movie.id))
}
function displayMovies(arr = [] , container = "" ) {
    const father = document.getElementById(`${container}`);
    father.innerHTML = "";
    
    arr.forEach(movie => {
        const item = document.createElement("div")
        item.innerHTML = `<a href="../movie-details/details.html">
        <img src="${img_URL+movie.poster_path}" class="card-img-top " style="width:16%;" alt="">
        </a>
        <span class=" rounded-5">${(movie.vote_average).toFixed(1)}</span>`;
        father.appendChild(item);
        item.classList.add(`appear`);
        // top-rated-movie , when I want to delete this moveis this is a token for me to delete it
        item.addEventListener("click" , ()=>{
            getDetails(movie);
        })
    })
}

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzdjOTFkZWQzOTc2MmVjMzI2YjljMjQzNTE0Nzk5MiIsIm5iZiI6MTczMzI2ODE3NS42NzYsInN1YiI6IjY3NGY5MmNmYjY2NjgzMGI2ZTQzZDFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3wvCOYyID16VX9fXA2ooCDgVry533lsf4igmKBPQqjM'
    }
};
let moviesByAi = [];

async function getMoviesByAi() {
    let mood = document.getElementById("mood").value;
    const typeMood = document.getElementById("type-mood").value;

    document.getElementById("searched-container").innerHTML=`
    <span class="loader"></span>
    <span class="loader"></span>
    <span class="loader"></span>
    <span class="loader"></span>
    <span class="loader"></span>
    ` // loading here 
    if (mood == "select your mood" && typeMood) {
        mood = typeMood;
    }
    console.log(mood);
    
    let req = await fetch('http://localhost:3000/suggest-movies', {
        method : "POST",
        headers: {
            "Content-Type": "application/json", // Required for JSON data
        },
        body: JSON.stringify({
            "mood": mood,
        })
    })
    let movies = await req.json();
    movies = movies.message;
    movies = movies.split(',');
    if (moviesByAi.length>1) {
        moviesByAi = [];
    }
    for(const movie of movies){
        let searchKey = formatString(movie);
        let searchMovies = await getMoviesBySearch(searchKey); //array of results
        let filteredMovies = searchMovies.filter(element => 
            element.title.toLowerCase().includes(movie.toLowerCase())
        );
        moviesByAi = [...moviesByAi , ...filteredMovies];
    }
    document.getElementsByClassName("num-of-found")[0].innerHTML = moviesByAi.length
    displayMovies(moviesByAi , "searched-container");
}
async function getMoviesBySearch (searchKey) {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchKey}`,options);
    response = await response.json();
    response = response.results; 
    response = await response.filter(movie => movie.poster_path !== null)   
    return response;
}
