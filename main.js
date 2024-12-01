const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    alert(inputValue);
});
// search function
let arr = []
async function getApi()
{
    let response = await fetch("https://freetestapi.com/api/v1/movies").then(data => data.json()).then(sdata => console.log(sdata))

}
getApi()