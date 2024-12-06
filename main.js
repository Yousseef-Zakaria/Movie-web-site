const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const arrowRight = document.getElementById("arrow-right");
const arrowLeft = document.getElementById("arrow-left");
searchButton.addEventListener('click',async () => {
    const inputValue = searchInput.value;
        // window.location.href = "./pages/search/search.html"
});
const img_URL = `https://image.tmdb.org/t/p/w500`
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
arrowRight.addEventListener("click",function () {
    const oldItems = document.querySelectorAll(".appear");    
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
        getTrendingMovies();
    }, 500);

})
arrowLeft.addEventListener("click",()=>{
    const oldItems =  document.querySelectorAll(".appear");
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
        getTrendingMovies();
    },500)
})
const productsContainer = document.getElementById("products-container")
async function getTrendingMovies()
{    
    if (arr.length === 0) {
        // جلب البيانات إذا لم يتم جلبها مسبقًا
        let response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
        arr = await response.json();        
        intervalOfOrder = arr.results.length; // تعيين العدد الإجمالي للعناصر
    }
    for (let i = startOfOrder; i < endOfOrder ; i++) {        
        let product = document.createElement("div")
        product.innerHTML= `   
        <a href="/pages/movie-details/details.html"><img src="${img_URL+arr.results[i].poster_path}" class="card-img-top " style="width:16%;" alt=""></a>
        `;
        product.classList.add("appear")
        productsContainer.appendChild(product);
        product.addEventListener("click",()=>{
            getDetails(arr.results[i]);
        })
    }
}
getTrendingMovies();
// show details 
let getDetails = (movie) =>{
    localStorage.setItem("selectedMovieForDetails" , String(movie.id))
}




