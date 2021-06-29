let currentPage = 1;
let totalPages = 1;
const CATEGORY_LATEST = "upcoming";
const CATEGORY_TOP = "top_rated";

let toggleButton = document.getElementById("toggle-button");
let navbatLinks = document.getElementById("nav-bar-links");
toggleButton.addEventListener("click", function() {
    navbatLinks.classList.toggle("active");
})


function getMovies(currentCategory, page, loadMore) {
    fetch("https://api.themoviedb.org/3/movie/" + currentCategory + "?api_key=bbe62cd9dc8d28c5145b7e276c5ce617&language=en-US&page=" + page, {
            method: "GET"
        })
        .then(function(response) {
            console.log("responseData");
            if (response.status !== 200) {
                throw response.status;
            }
            return response.json();
        })
        .then(function(responseData) {
            console.log(responseData);
            var fragment = document.createDocumentFragment();

            responseData.results.forEach(item => {
                let li = document.createElement("li");
                li.setAttribute("class", "movies-list-item")
                li.setAttribute("id", item.id)

                let span = document.createElement("span");
                span.setAttribute("class", "movie-titles-span")
                span.textContent = item.title;

                let img = document.createElement("img");
                img.setAttribute("class", "movie-images");
                img.src = "https://image.tmdb.org/t/p/original/" + item.poster_path;

                li.appendChild(img);
                li.appendChild(span);

                li.addEventListener("click", movieClick);

                fragment.appendChild(li);

            });
            if (loadMore === false) {
                document.getElementById("list").innerHTML = " ";
            }
            document.getElementById("list").appendChild(fragment);

            totalPages = responseData.total_pages;

        })
        .catch(function(error) {
            if (error == 404) {
                console.log("Page not found");
            } else {
                console.log();
            }

        });
}
getMovies(CATEGORY_LATEST, currentPage, false);

let topRatedBtn = document.getElementById("top-rated-btn");
let upcomingBtn = document.getElementById("upcoming-btn");

upcomingBtn.setAttribute("class", "tab-button-current tab-buttons");

topRatedBtn.addEventListener("click", function() {
    currentPage = 1;
    topRatedBtn.style.backgroundColor = "#fff";
    upcomingBtn.style.backgroundColor = "#0c2738";
    topRatedBtn.setAttribute("class", "tab-button-current tab-buttons");
    upcomingBtn.setAttribute("class", "tab-buttons");
    getMovies(CATEGORY_TOP, currentPage, false);

})


upcomingBtn.addEventListener("click", function() {
    currentPage = 1;
    upcomingBtn.style.backgroundColor = "#fff";
    topRatedBtn.style.backgroundColor = "#0c2738";
    upcomingBtn.setAttribute("class", "tab-button-current tab-buttons");
    topRatedBtn.setAttribute("class", "tab-buttons");
    getMovies(CATEGORY_LATEST, currentPage, false);
})

document.getElementById("load-more-btn").addEventListener("click", function() {
    currentPage += 1;
    getMovies(CATEGORY_LATEST, currentPage, true);

})


function getDiscoverMovies(query) {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=bbe62cd9dc8d28c5145b7e276c5ce617&language=en-US&query=" + query + "&page=1&include_adult=false", {
            method: "GET"
        })
        .then(function(response) {
            console.log("responseData");
            if (response.status !== 200) {
                throw response.status;
            }
            return response.json();
        })
        .then(function(responseData) {
            console.log(responseData);
            var fragment = document.createDocumentFragment();

            responseData.results.forEach(item => {
                let li = document.createElement("li");
                li.setAttribute("class", "movies-list-item")

                let span = document.createElement("span");
                span.setAttribute("class", "movie-titles-span")
                span.textContent = item.title;

                let img = document.createElement("img");
                img.setAttribute("class", "movie-images");
                img.src = "https://image.tmdb.org/t/p/original/" + item.poster_path;


                li.appendChild(img);
                li.appendChild(span);

                li.addEventListener("click", movieClick);

                fragment.appendChild(li);

            });
            document.getElementById("list").innerHTML = " ";
            document.getElementById("list").appendChild(fragment);

            totalPages = responseData.total_pages;

        })
        .catch(function(error) {
            if (error == 404) {
                console.log("Page not found");
            } else {
                console.log();
            }

        });
}

function movieClick(e) {
    console.log(e.target.getAttribute("id").value);
    console.log("hello");

}

document.getElementById("search-btn").addEventListener("click", function() {
    var x = document.getElementById("input-search").value;
    if (x !== "") {
        getDiscoverMovies(x);
        window.scrollTo(500, 0);
        document.getElementById("input-search").value = "";
    }
})

var input = document.getElementById("input-search");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        if (input !== "") {
            event.preventDefault();
            document.getElementById("search-btn").click();
        }
    }
});


function getTVShows() {
    fetch("https://api.themoviedb.org/3/guest_session/{guest_session_id}/rated/tv?api_key=bbe62cd9dc8d28c5145b7e276c5ce617&language=en-US&sort_by=created_at.asc", {
            method: "GET"
        })
        .then(function(response) {
            console.log("responseData");
            if (response.status !== 200) {
                throw response.status;
            }
            return response.json();
        })
        .then(function(responseData) {
            console.log(responseData);
            var fragment = document.createDocumentFragment();

            responseData.results.forEach(item => {
                let li = document.createElement("li");
                li.setAttribute("class", "movies-list-item")
                li.setAttribute("id", "movies-item")

                let span = document.createElement("span");
                span.setAttribute("class", "movie-titles-span")
                span.textContent = item.title;

                let img = document.createElement("img");
                img.setAttribute("class", "movie-images");
                img.src = "https://image.tmdb.org/t/p/original/" + item.poster_path;

                li.appendChild(img);
                li.appendChild(span);

                fragment.appendChild(li);

            });
            document.getElementById("list").innerHTML = " ";
            document.getElementById("list").appendChild(fragment);

            totalPages = responseData.total_pages;

        })
        .catch(function(error) {
            if (error == 404) {
                console.log("Page not found");
            } else {
                console.log();
            }

        });
}