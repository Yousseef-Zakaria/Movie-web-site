const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const continueButton = document.getElementById("continue-button");
continueButton.addEventListener("click",function () {
        localStorage.setItem("Email" , emailInput.value)
        localStorage.setItem("password" , passwordInput.value)
})
export const isLoged = () => {
    return localStorage.getItem("Email") ? true : false;
}
const hideWhenLoged = document.getElementById("hide-if-log");
const hideWhenUnLoged = document.getElementById("hide-if-unlog");
const message = document.getElementById("user-message")
if (isLoged()) {
    hideWhenLoged.style.display= "none"
    message.innerHTML = `Hello ${localStorage.getItem("Email").split("@")[0]}`
    hideWhenUnLoged.style.display = "flex"
}
if (!isLoged()) {
    hideWhenUnLoged.style.display = "none"
}
function logOut() {
    localStorage.removeItem("Email")
    localStorage.removeItem("password")
    
}
const logOutBTN = document.getElementById("log-out-buuton");
logOutBTN.addEventListener("click",function () {
    localStorage.removeItem("Email")
    localStorage.removeItem("password")
    location.reload();
})
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzdjOTFkZWQzOTc2MmVjMzI2YjljMjQzNTE0Nzk5MiIsIm5iZiI6MTczMzI2ODE3NS42NzYsInN1YiI6IjY3NGY5MmNmYjY2NjgzMGI2ZTQzZDFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3wvCOYyID16VX9fXA2ooCDgVry533lsf4igmKBPQqjM'
//     }
// };

// fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', options)
//     .then(res => res.json())
//     .then(res => console.log(res.results))
//     .catch(err => console.error(err));



