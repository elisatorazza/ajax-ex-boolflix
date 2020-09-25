$(document).ready(function (){
//evento click sul bottone
  $("header button").click(function(){
    search()
  });
  //evento click tasto enter
  $(".search-input").keyup(function(event){
    if (event.which == 13) {
    search()
    }
  });

  function search() {
    var searchText = $(".search-input").val();
    resetString();
    getData("tv", searchText);
    getData("movie", searchText);
  }
  //funzione per effettuare chiamata al server e ottenere un i valori contenuti nelle chiavi dell'oggetto result

    function getData (type, searchString) {
      $.ajax(
      {
        "url": "https://api.themoviedb.org/3/search/"+type,
        "data": {
          "api_key": "9d6252a7271af37aade1820cead19342",
          "query": searchString,
          "language": "it-IT",
          "include_adult": "false",
        },
        "method": "GET",
        "success": function(data) {
          renderData(data.results);
        },
        "error": function (err) {
          alert("E' successo qualcosa");
        }
      }
    );
  }
  //funzione per prendere il template, modificarlo, e inserirlo nel testo
  function renderData (movies) {
    var source = $("#movie-template").html();
    var template = Handlebars.compile(source);

  for (var i = 0; i<movies.length; i++) {
    var poster = "https://image.tmdb.org/t/p/w342" +movies[i].poster_path;
    if (movies[i].poster_path == null) {
      poster = "img/no_poster.png";
    }
      var context = {
        "title": movies[i].title || movies[i].name,
        "originalTitle": movies[i].original_title ||movies[i].original_name,
        "language": getLanguage(movies[i].original_language),
        "vote": printStars(movies[i].vote_average),
        "poster": poster,
        "overview": movies[i].overview,
      };

      var html = template(context);
      $(".movies-list").append(html);
    }
  }

// funzione per resettare input e lista
  function resetString() {
    $(".movies-list").empty();
    $(".search-input").val("");
  }
//Funzione per trasformare il voto da 1 a 10, in un voto da 1 a 5 e successivamente in stelle
function printStars(vote){
  var voteTransform = parseInt(Math.ceil(vote) / 2); //Trasformo il voto in un numero da 0 a 5 arrotondato per eccesso
    //Creo un array di 5 stelle vuote
    var emptyStar = ["<i class='far fa-star'></i>", "<i class='far fa-star'></i>", "<i class='far fa-star'></i>", "<i class='far fa-star'></i>", "<i class='far fa-star'></i>"];
    //Ciclo la lunghezza del voto, in modo da creare ad ogni ciclo una stella che sovrascrive un elemento dell'array precedente
    for (var j = 0; j<voteTransform; j++) {
      var star = "<i class='fas fa-star'></i>";
      emptyStar[j] = star;
    }
    var starList = emptyStar.join(' '); //Tolgo le virgole dagli elementi dell'array
  return starList;
}
  // Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API.
  //Creo un array di bandiere
function getLanguage (lang) {
  var flagList = [
  {
    "name": "de",
    "img": "<img src='img/de.svg' alt='German'>",
  },
  {
    "name": "es",
    "img": "<img src='img/es.svg' alt='Spanish'>",
  },
  {
    "name": "fr",
    "img": "<img src='img/fr.svg' alt='French'>",
  },
  {
    "name": "en",
    "img": "<img src='img/gb.svg' alt='English'>",
  },
  {
    "name": "it",
    "img": "<img src='img/it.svg' alt='Italian'>",
  },
  {
    "name": "nl",
    "img": "<img src='img/nl.svg' alt='Dutch'>",
  },
  {
    "name": "ru",
    "img": "<img src='img/ru.svg' alt='Russian'>",
  },
  {
    "name": "us",
    "img": "<img src='img/us.svg' alt='American'>",
  },
];
//Definisco la variabile dell'immagine
var flagImg = lang;
//Ciclo l'array che contiene le immagini delle bandiere e nel caso sovrascrivo la variabile
  for (var y =0; y<flagList.length; y++) {
    if (flagList[y].name === lang) {
      return flagImg = flagList[y].img;
    }
  }
  return flagImg;
  }
});
