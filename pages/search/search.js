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
const searchKey = `${formatString(localStorage.getItem("searchQuery"))}`;
console.log(searchKey);
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzdjOTFkZWQzOTc2MmVjMzI2YjljMjQzNTE0Nzk5MiIsIm5iZiI6MTczMzI2ODE3NS42NzYsInN1YiI6IjY3NGY5MmNmYjY2NjgzMGI2ZTQzZDFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3wvCOYyID16VX9fXA2ooCDgVry533lsf4igmKBPQqjM'
    }
};
let arr =[]
async function getMoviesBySearch  () {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchKey}`,options);
    arr = await response.json();
    arr = await arr.results; 
    arr = await arr.filter(movie => movie.poster_path !== null)   
    
    displayMovies(arr , "searched-container");
}

let getDetails = (movie) =>{
    localStorage.setItem("selectedMovieForDetails" , String(movie.id))
}
function displayMovies(arr = [] , container = "" ) {
    const father = document.getElementById(`${container}`);
    father.innerHTML = "";
    document.getElementById("found-number").innerHTML = `Found (${arr.length})`
    arr.forEach(movie => {
        const item = document.createElement("div")
        item.innerHTML = `<a href="/pages/movie-details/details.html">
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
getMoviesBySearch();
const goBack = document.getElementsByClassName("go-back")[0];
goBack.addEventListener("click", () =>{
    window.history.back()
})
