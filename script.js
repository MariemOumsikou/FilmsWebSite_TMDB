const API_TOKEN = "6a99c14b767fa1380fe1cfd1ad04bbe8";

function fetchPopularfilms() {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_TOKEN;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const PopularFilmsContainer = document.getElementById("PopularFilmsContainer");
        DisplayPopularfilms(data.results, PopularFilmsContainer);
    })
    .catch(error => {
        console.error("Erreur dans la récupération des films:", error);
    });
}

function fetchSearchedfilms () {
    const KeyWord = document.getElementById('search-input').value; 
    const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN +
                      '&language=fr&query=' + KeyWord + "&page=1";
    
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('searchedFilms', JSON.stringify(data.results));
        window.location.href = 'SearchFilms.html'; 
    })
    .catch(error => {
        console.error("Erreur dans la récupération des films:", error);
    });
}

function FilmDetails(FilmTitle, ID) {
    console.log("Détails du film :", FilmTitle);
    console.log(ID);
    const url = 'https://api.themoviedb.org/3/movie/' + ID + '?api_key=' + API_TOKEN + '&language=fr';
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        localStorage.setItem('FilmDetails', JSON.stringify(data));
        window.location.href = 'FilmDetails.html';
    })
    .catch(error => {
        console.error("Erreur dans la récupération du film:", error);
    });
}


function DisplayPopularfilms(movies, Container) {
    Container.innerHTML = ''; 

    movies.forEach(movie => {
        const FilmContainer = document.createElement('div');
        const FilmImage = document.createElement('img');
        const FilmTitle = document.createElement('h3');
        const FilmVote = document.createElement('p');

        FilmContainer.className = 'FilmContainer';
        const id = movie.id;
        console.log(id);
        FilmContainer.onclick = () => FilmDetails(movie.title, id); 

        FilmImage.className = 'FilmImage';
        FilmImage.src = 'https://image.tmdb.org/t/p/w300' + movie.poster_path; 
        FilmTitle.className = 'FilmTitle';
        FilmTitle.innerHTML = movie.title;
        
        FilmVote.innerHTML = movie.vote_average; 

        FilmContainer.appendChild(FilmImage);
        FilmContainer.appendChild(FilmTitle);
        FilmContainer.appendChild(FilmVote);
        Container.appendChild(FilmContainer);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const SearchedFilmsContainer = document.getElementById("SearchedFilmsContainer");
    
    const searchedFilms = JSON.parse(localStorage.getItem('searchedFilms'));  
    if (searchedFilms) {
        DisplayPopularfilms(searchedFilms, SearchedFilmsContainer);
    } else {
        console.error("Aucun film trouvé");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const FilmDetailsContainer = document.getElementById('FilmDetailsContainer');
    const savedFilm = JSON.parse(localStorage.getItem('FilmDetails'));
    console.log(savedFilm);
    if (savedFilm) {
        const InfosContainer = document.createElement('div');
        const FilmImage = document.createElement('img');
        const FilmTitle = document.createElement('h1');
        const FilmOverview = document.createElement('p');
        const FilmTypes = savedFilm.genres;
        const WatchBtn = document.createElement('button');
        
        InfosContainer.id = "FilmInfo";
        FilmOverview.textContent = savedFilm.overview;
        FilmImage.src = 'https://image.tmdb.org/t/p/w300' + savedFilm.poster_path;
        FilmImage.id = "FilmImage";
        FilmTitle.innerHTML = savedFilm.title;
        FilmTitle.id = "FilmTitle"
        FilmOverview.id = "FilmOverview"
        WatchBtn.textContent = "Regarder";

        FilmDetailsContainer.appendChild(FilmImage);
        InfosContainer.appendChild(FilmTitle);
        InfosContainer.appendChild(FilmOverview);
        FilmTypes.forEach(Type => {
            const FilmType = document.createElement('p');
            FilmType.textContent = Type.name;
            FilmType.className="FilmType";
            InfosContainer.appendChild(FilmType);
        });
        InfosContainer.appendChild(WatchBtn);
        FilmDetailsContainer.appendChild(InfosContainer);
    } else {
        console.error("Aucun détail de film trouvé.");
    }
});

fetchPopularfilms();
