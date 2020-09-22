$(document).ready(function (){

  $("header button").click(function(){
    var searchText = $(".search-input").val();
    console.log(searchText);
    $.ajax(
      {
        "url":"https://api.themoviedb.org/3/search/movie",
        "data": {
          "api_key": "9d6252a7271af37aade1820cead19342",
          "query": searchText,
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

  function renderMovie (movies) {

    var source = $("#movie-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i<movies.length; i++) {
      console.log(movies[i]);
      var context = {
        "title": movies[i].title,
        "originalTitle": movies[i].original_title,
        "language": movies[i].original_language,
        "vote": movies[i].vote_average,
      };
      var html = template(context);
      $(".movies-list").append(html);
    }
  }
});
});
