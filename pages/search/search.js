
const params = new URLSearchParams(window.location.search);
const data = params.get('data');
const searchedProducts = JSON.parse(decodeURIComponent(data));
console.log(searchedProducts);
