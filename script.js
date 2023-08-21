//variables (api)
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=f30c99133645d55f5ae10009838a94ce";
const IMG_PATH = "https://image.tmdb.org/t/p/w300";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=f30c99133645d55f5ae10009838a94ce&query="';

//get movies via fetch
getMovies(API_URL);

async function getMovies(url) {
  const movies = await fetch(url);
  const data = await movies.json();

  showMovies(data.results);
}

//variables (dom)
const form = document.querySelector("#search-form");
const input = document.querySelector("#search");
const container = document.querySelector(".container");

//show movie fuction
function showMovies(movies) {
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieCard = document.createElement("div");
    movieCard.classList.add("card");

    movieCard.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}" />
    <div class="card-info">
      <h2 class="title">${title}</h2>
      <span class="rating">${vote_average.toFixed(1)}</span>
    </div>
    <div class="overview-container">
      <h3 class="overview-title">Overview</h3>
      <p class="overview">
        ${overview}
      </p>
    </div>
    `;
    container.appendChild(movieCard);
  });
}

//search event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value && input.value !== "") {
    getMovies(SEARCH_API + input.value);
    input.value = "";
  } else {
    window.location.reload();
  }
});
