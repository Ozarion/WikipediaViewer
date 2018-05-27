const apiBaseURL = "https://en.wikipedia.org/w/api.php?";
const apiFormat = "format=json&formatversion=2";
const apiAction = "action=opensearch";

const searchBox = document.getElementById("searchBox");

//Search wikipedia api and pass json data to viewData function
const queryAPIFor = function(searchTitle) {
    let requestURL = `${apiBaseURL+apiAction}&search=${encodeURIComponent(searchTitle)}&prop=revisions&rvprop=content&${apiFormat}&origin=*`;
    let request = new XMLHttpRequest();
    
    request.open("GET",requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = () => {
        insertIntoPage(request.response);
    };
}

//is called inside 'search' function. Shows data on screen
const insertIntoPage = function(Data) {
    let resultSection = document.querySelector("#resultSection");
    resultSection.innerHTML = `<h3>Search results for <strong>${Data[0]}</strong></h3>`;
    let n = Data[1].length;

    for (let i = 0; i < n; i++) {
        let article = document.createElement('article');
        article.classList.add('article');
        article.innerHTML += `<h2 class="title">${Data[1][i]}</h2>`
        article.innerHTML += `<p class="summary">${Data[2][i]}</p>`
        article.innerHTML += `<a class="article-link" href="${Data[3][i]}" target="_blank">Visit</h2>`;
        resultSection.appendChild(article);
        article.addEventListener("click", () => {
            window.open(article.querySelector("a").href,"_blank");
        });
    }
}

const search = function() {
    let searchText = searchBox.value;
    queryAPIFor(searchText);
}

const enterPress = function(e) {
    if (e.keyCode !== 13) return;
    search();
}

window.onload = function () {
    searchBox.addEventListener("keyup", enterPress);
    searchBox.value = '';
}