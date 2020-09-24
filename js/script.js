$(document).ready(function (){
//evento click sul bottone
  $("header button").click(function(){
    var searchText = $(".search-input").val();
    resetString();
    getMovies(searchText);
  });
  //evento click tasto enter
  $(".search-input").keyup(function(event){
    if (event.which == 13) {
      var searchText = $(".search-input").val();
      resetString();
      getMovies(searchText);
    }
  });
  //funzione per prendere il template, modificarlo, e inserirlo nel testo
  function renderMovie (movies) {
    var source = $("#movie-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i<movies.length; i++) {
      var vote = parseInt(Math.ceil(movies[i].vote_average) / 2); //Trasformo il voto in un numero da 0 a 5 arrotondato per eccesso
        //Creo un array di 5 stelle vuote
        var emptyStar = ["<i class='far fa-star'></i>", "<i class='far fa-star'></i>", "<i class='far fa-star'></i>", "<i class='far fa-star'></i>", "<i class='far fa-star'></i>"];
        //Ciclo la lunghezza del voto, in modo da creare ad ogni ciclo una stella che sovrascrive un elemento dell'array precedente
        for (var j = 0; j<vote; j++) {
          var star = "<i class='fas fa-star'></i>";
          emptyStar[j] = star;
        }
        var starList = emptyStar.join(' '); //Tolgo le virgole dagli elementi dell'array

        // Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).

      //Creo un array di bandiere
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
      var flagImg = movies[i].original_language;
      //Ciclo l'array che contiene le immagini delle bandiere e nel caso sovrascrivo la variabile
      for (var y =0; y<flagList.length; y++) {
        if (flagList[y].name === movies[i].original_language) {
          flagImg = flagList[y].img;
        }
      }

      var context = {
        "title": movies[i].title,
        "name": movies[i].name,
        "originalTitle": movies[i].original_title,
        "originalName": movies[i].original_name,
        "language": flagImg,
        "vote": starList,
        "poster": movies[i].poster_path,
      };

      var html = template(context);
      $(".movies-list").append(html);
    }
  }
//funzione per effettuare chiamata al server e ottenere il risultato
  function getMovies(searchString) {
    $.ajax(
      {
        "url": "https://api.themoviedb.org/3/search/movie",
        "data": {
          "api_key": "9d6252a7271af37aade1820cead19342",
          "query": searchString,
          "language": "it-IT",
          "include_adult": "false",
        },
        "method": "GET",
        "success": function(data) {
          renderMovie(data.results);
        },
        "error": function (err) {
          alert("E' successo qualcosa");
        }
      }
    );
    // Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
    $.ajax(
      {
        "url": "https://api.themoviedb.org/3/search/tv",
        "data": {
          "api_key": "9d6252a7271af37aade1820cead19342",
          "query": searchString,
          "language": "it-IT",
          "include_adult": "false",
        },
        "method": "GET",
        "success": function(data) {
          renderMovie(data.results);
        },
        "error": function (err) {
          alert("E' successo qualcosa");
        }
      }
    );
  }
// funzione per resettare input e lista
  function resetString() {
    $(".movies-list").empty();
    $(".search-input").val("");
  }


});
