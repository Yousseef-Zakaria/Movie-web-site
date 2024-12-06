const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzdjOTFkZWQzOTc2MmVjMzI2YjljMjQzNTE0Nzk5MiIsIm5iZiI6MTczMzI2ODE3NS42NzYsInN1YiI6IjY3NGY5MmNmYjY2NjgzMGI2ZTQzZDFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3wvCOYyID16VX9fXA2ooCDgVry533lsf4igmKBPQqjM'
    }
};
const img_URL = `https://image.tmdb.org/t/p/w500`;
let arr={};
async function getMovieDetails(){
    const id = Number(localStorage.getItem("selectedMovieForDetails"));
    let response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
    arr =await response.json();
    console.log(arr);
    let movie = document.createElement("div");
    movie.innerHTML = `<div class="container d-flex  flex-wrap gap-5">
            <div class="left ms-4 w-25">
            <img src="${img_URL+arr.poster_path}" width="100%" alt="">
            </div>
            <div class="right description w-50 d-flex flex-column gap-4">
            <h1 class="name  fw-bold text-wrap flex-wrap fs-1">${arr.title}</h1>
            <h1 class="name  fw-bold text-wrap flex-wrap fs-1">original title : ${arr.original_title}</h1>
            <h1 class="name  fw-bold fs-4">popularity : ${arr.vote_average * 10}% <i class="fa-solid fa-star"></i></h1>
            <h4 class="name  text-wrap fs-5">${arr.overview}</h4>
            <a class="button-35" href="${arr.homepage}" target="blank" role="button">whatch now     <i class="fa-regular fa-lg fa-circle-play"></i> </a>
            </div>
        </div>`
        document.getElementById("home").appendChild(movie)
        document.getElementsByTagName("body")[0].style.backgroundImage = `url("${img_URL+arr.backdrop_path}")`;
        document.getElementsByTagName("body")[0].style.backgroundRepeat= "no-repeat" ;
        document.getElementsByTagName("body")[0].style.backgroundAttachment = "fixed" ;
        document.getElementsByTagName("body")[0].style.backgroundSize = "cover" ;
        
}

getMovieDetails()


