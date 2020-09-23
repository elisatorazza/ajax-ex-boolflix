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
          "img": "../img/de.svg",
        },
        {
          "name": "es",
          "img": "../img/es.svg",
        },
        {
          "name": "fr",
          "img": "../img/fr.svg",
        },
        {
          "name": "en",
          "img": "../img/gb.svg",
        },
        {
          "name": "it",
          "img": "../img/it.svg",
        },
        {
          "name": "nl",
          "img": "../img/nl.svg",
        },
        {
          "name": "ru",
          "img": "../img/ru.svg",
        },
        {
          "name": "us",
          "img": "../img/us.svg",
        },
    ];

      for (var y =0; y<flagList.length; y++) {
        if (flagList[y].name == movies[i].original_language) {
          var flagImg = flagList[y].img
          console.log(flagImg);
        }
      }

      var context = {
        "title": movies[i].title,
        "originalTitle": movies[i].original_title,
        "language": flagImg,
        "vote": starList,
      };
      console.log(context.language);
      var html = template(context);
      $(".movies-list").append(html);
    }
  }
//funzione per effettuare chiamata al server e ottenere il risultato
  function getMovies(searchString) {
    $.ajax(
      {
        "url":"https://api.themoviedb.org/3/search/movie",
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
