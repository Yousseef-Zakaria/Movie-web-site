const goBack = document.getElementsByClassName("rounded-5")[0];
goBack.addEventListener("click", () =>{
    window.history.back()
})
let moviesInWathList = localStorage.getItem("watch-list");
if (moviesInWathList) {
    document.getElementById("empty-alt").style.display = "none";
}
let moviesArray = moviesInWathList.split(",");
moviesArray = moviesArray.filter(movie => movie.length != 0 )
let moviesIDArray = moviesArray.map(item => Number(item));
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzdjOTFkZWQzOTc2MmVjMzI2YjljMjQzNTE0Nzk5MiIsIm5iZiI6MTczMzI2ODE3NS42NzYsInN1YiI6IjY3NGY5MmNmYjY2NjgzMGI2ZTQzZDFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3wvCOYyID16VX9fXA2ooCDgVry533lsf4igmKBPQqjM'
    }
};
const img_URL = `https://image.tmdb.org/t/p/w500`;
let displayOneMovie = (movie) =>{
    let child = document.createElement("div");
    child.classList.add("list-item");
    child.classList.add("d-flex");
    child.classList.add("mt-3");
    child.classList.add("w-50");
    child.innerHTML = `
            <div class="left w-25">
                <img src="${img_URL+movie.poster_path}" class="w-100 rounded-4" alt="">
            </div>
            <div class="right w-75 ms-3">
                <span class="fs-2 d-block text-white">${movie.title}</span>
                <span class="fs-6 d-block text-white">${movie.overview}</span>
                <div class="d-flex mt-2 gap-2">
                    <a href="${movie.homepage}" target="blank" class="bg-circle">
                        <i class="fa-solid fa-play"></i>
                    </a>
                    <button class="bg-circle-remove" onclick="removeMovieFromWatchList(${movie.id})">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        `;
    document.getElementsByClassName("list-container")[0].appendChild(child);
}
function removeMovieFromWatchList(id){
    id = Number(id);
    moviesIDArray  = moviesIDArray.filter(ele => ele!==id)
    let moviesString = moviesIDArray.map(ele => String(ele));
    localStorage.setItem("watch-list",moviesString.join(","))
    location.reload();
}
let movie ={}
async function fetchMoviesInList()
{
    for (const element of moviesIDArray) {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${element}`, options);
        movie =await response.json();
        displayOneMovie(movie);
    }    
}
fetchMoviesInList()