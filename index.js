var App = require('actions-on-google').ApiAiApp;
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

//Netflix api stuff
var actor_data, director_data;
function getData(q){
  request.get({
    url: "http://netflixroulette.net/api/api.php?actor=" + q
    // qs: {
    //   'api-key': "96ca0bfebb174ebaa9e6fe5ae6dd3d91"
    // },
  }, function(err, response, body) {
    actor_data = JSON.parse(body);
    console.log(actor_data);
  });
  request.get({
    url: "http://netflixroulette.net/api/api.php?director=" + q
  }, function(err, response, body) {
    director_data = JSON.parse(body);
    console.log(director_data);
  });
}
//getData("Tom Hanks");

const NO_INPUTS = [
  'I didn\'t hear that.',
  'If you\'re still there, say that again.',
  'We can stop here. See you soon.'
];

const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {
  const app = new App({ req, res });

  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function getMovies(app){
    console.log("inside get movies");
    app.tell('This is my response');
  }

  function moreMovies(app){}

  let actionMap = new Map();
  actionMap.set('get.movies', getMovies);
  actionMap.set('more.movies', moreMovies);
  app.handleRequest(actionMap);
}

// exports.movieassist = (request, response) => {}
//
//
// }











/**/
