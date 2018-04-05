const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const api = require('../lib/movieAPI.js');
const mongodb = require('../database/index.js');
const rp = require('request-promise');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, () => { console.log('MovieList app listening on port 3000!') });

var movies = [

];

app.get('/movies', (req, res) => {
    console.log('Express Get Success');
    mongodb.Movie.find()
    .limit(4)
    .sort('title')
    .then(movies => res.send(movies));
});

app.get('/search', (req, res) => {
    console.log('Express Get Search Success');
    let query = req.query.query;

    mongodb.Movie.findOne({'title': query}, (err, movie) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Express Search Complete');
            res.send(movie);
        }
      });
});
 
app.post('/movies', (req, res) => {
    var options = {
        uri: `https://api.themoviedb.org/3/search/movie?api_key=${api.movieAPIKey}&language=en-US&query=${req.body.title}`
    }
    
    rp(options)
    .then((data) => {
        console.log('Express POST Success', JSON.parse(data));
        var data = JSON.parse(data);
        var results = {
            title: data.results[0].title,
            description: data.results[0].overview,
            id: data.results[0].id
        }; 
        
        var insertData = new mongodb.Movie(results);
        insertData.save((error) => {
            if (error) {
                console.log('Express Insert Failed', error);
            } else {
                console.log('Express Insert Success');
            }
        })

        movies.push(results);
        res.send(movies);
    })
    .catch((error) => {
        console.log('Express POST failure');
    });  
})
