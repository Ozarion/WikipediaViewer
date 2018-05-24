const apiBaseURL = "https://en.wikipedia.org/w/api.php?";
const apiFormat = "format=json&formatversion=2";
const apiAction = "action=opensearch";

//Search wikipedia api and pass json data to viewData function
const search = function(searchTitle) {
    let requestURL = `${apiBaseURL+apiAction}&search=${encodeURIComponent(searchTitle)}&prop=revisions&rvprop=content&${apiFormat}&origin=*`;
    let request = new XMLHttpRequest();
    
    request.open("GET",requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = () => {
        viewData(request.response);
    };
}

//is called inside 'search' function. Shows data on screen
const viewData = function(Data) {
    let searchResults = document.querySelector("#searchResult");
    searchResults.textContent = `Search result for ${Data[0]}`;
    let n = Data[1].length;
    
    for (let i = 0; i < n; i++) {
        searchResults.innerHTML += `<h2>${Data[1][i]}</h2>`
        searchResults.innerHTML += `<h4>${Data[2][i]}</h4>`
        searchResults.innerHTML += `<a href="${Data[3][i]}" target="_blank">Visit</h2>`;
    }
}

window.onload = function () {
    let title = prompt("Search term: ");
    search(title);
}