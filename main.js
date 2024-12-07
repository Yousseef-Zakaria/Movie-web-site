const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const arrowRight = document.getElementById("arrow-right");
// const arrowRightInTopRated = document.getElementById("arrow-right-top-rated");
const arrowLeft = document.getElementById("arrow-left");
// const arrowLeftInTopRated = document.getElementById("arrow-left-top-rated");
searchButton.addEventListener('click',async () => {
    const inputValue = searchInput.value;
    localStorage.setItem("searchQuery",`${inputValue}`);
        // window.location.href = "./pages/search/search.html"
});
const img_URL = `https://image.tmdb.org/t/p/w500`;

const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzdjOTFkZWQzOTc2MmVjMzI2YjljMjQzNTE0Nzk5MiIsIm5iZiI6MTczMzI2ODE3NS42NzYsInN1YiI6IjY3NGY5MmNmYjY2NjgzMGI2ZTQzZDFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3wvCOYyID16VX9fXA2ooCDgVry533lsf4igmKBPQqjM'
        }
    };
// search function
let arr = []
let endOfOrder = 6;
let startOfOrder = 0;
let intervalOfOrder = 0;
arrowRight.addEventListener("click", ()=> {
    const oldItems = document.querySelectorAll(".trending-movie");    
    oldItems.forEach(item =>{
        item.classList.add("fade-out");
        item.addEventListener("animationend",()=>{
            item.remove();
        })
    })
    if (endOfOrder >= 24) {
        startOfOrder = -6;
        endOfOrder = 0;
    }
    endOfOrder+=6;
    startOfOrder+=6;
    intervalOfOrder -= 6;
    setTimeout(() => {
        displayMovies(arr.results , "products-container" ,startOfOrder , endOfOrder,"trending-movie");
    }, 500);

})
arrowLeft.addEventListener("click",()=>{
    const oldItems =  document.querySelectorAll(".trending-movie");
    oldItems.forEach(item =>{
        item.classList.add("fade-out-delete");
        item.addEventListener("animationend",()=>{
            item.remove();
        })
    }) // put animation and delete from DOM
    if(startOfOrder <= 0)
    {
        endOfOrder = 30 ;
        startOfOrder = 24;
    }
    startOfOrder -= 6;
    endOfOrder -= 6;
    setTimeout(()=>{
        displayMovies(arr.results , "products-container" ,startOfOrder , endOfOrder,"trending-movie");
    },500)
})

async function getTrendingMovies()
{    
    if (arr.length === 0) {
        // جلب البيانات إذا لم يتم جلبها مسبقًا
        let response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
        arr = await response.json();        
        intervalOfOrder = arr.results.length; // تعيين العدد الإجمالي للعناصر
    }
    displayMovies(arr.results , "products-container",0,6,"trending-movie");
}
getTrendingMovies();
// show details 
let getDetails = (movie) =>{
    localStorage.setItem("selectedMovieForDetails" , String(movie.id))
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!trending end here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let topRated = [];

async function getTopRatedMovies ()
{
    if (topRated.length === 0)
    {
        let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',options);
        topRated = await response.json();
        topRated = topRated.results;
    }
    displayMovies(topRated , "top-rated-container",0,6,"top-rated-movie");

}
getTopRatedMovies();


let currentPage = 0; // الصفحة الحالية
const itemsPerPage = 6; // عدد العناصر لكل صفحة

function displayMovies(arr = [] , container = "" , startIndex , endIndex , oldItemsClass ) {
    let currentItems = arr.slice(startIndex, endIndex);
    
    const father = document.getElementById(`${container}`);
    father.innerHTML = "";
    currentItems.forEach(movie => {
        const item = document.createElement("div")
        item.innerHTML = `<a href="/pages/movie-details/details.html">
        <img src="${img_URL+movie.poster_path}" class="card-img-top " style="width:16%;" alt="">
        </a>
        <span class=" rounded-5">${(movie.vote_average).toFixed(1)}</span>`;
        father.appendChild(item);
        item.classList.add(`appear`);
        item.classList.add(`${oldItemsClass}`); // top-rated-movie , when I want to delete this moveis this is a token for me to delete it
        item.addEventListener("click" , ()=>{
            getDetails(movie);
        })
    })
}
let start = 0;
let end = 6;

document.getElementById("arrow-right-top-rated").addEventListener("click" , ()=>{
    const oldItems = document.querySelectorAll(".top-rated-movie");    
    oldItems.forEach(item =>{
        item.classList.add("fade-out");
        item.addEventListener("animationend",()=>{
            item.remove();
        })
    })

    start += 6;
    end += 6;    
    setTimeout(()=>{
        displayMovies(topRated , "top-rated-container" , start , end, "top-rated-movie");
    },500)
    if (end >= 30) {
        start = 0;
        end = 6;
    }
})
document.getElementById("arrow-left-top-rated").addEventListener("click" , ()=>{
    const oldItems = document.querySelectorAll(".top-rated-movie");    
    oldItems.forEach(item =>{
        item.classList.add("fade-out-delete");
        item.addEventListener("animationend",()=>{
            item.remove();
        })
    })

    if (start <= 0) {
        start = 24;
        end = 30;
    }
    start -= 6;
    end -= 6;
    console.log(start , end);
    
    setTimeout(()=>{
        displayMovies(topRated , "top-rated-container" , start , end , "top-rated-movie");
    },500)
})