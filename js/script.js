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
  })
//funzione per prendere il template, modificarlo, e inserirlo nel testo
  function renderMovie (movies) {
    var source = $("#movie-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i<movies.length; i++) {
      var vote = parseInt(Math.ceil(movies[i].vote_average) / 2); //Trasformo il voto in un numero da 0 a 5 arrotondato per eccesso

      console.log(vote);
      var context = {
        "title": movies[i].title,
        "originalTitle": movies[i].original_title,
        "language": movies[i].original_language,
        //"vote": movies[i].vote_average,
      };
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
