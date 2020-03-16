const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res)=> {
    request('https://api.themoviedb.org/3/trending/all/day?api_key=fad5bb3b32edd9618789493647bac9d5', (err, response, body)=> {
        if(err){
            console.log("Error Occured : "+err);
        }

        var data = JSON.parse(body);

        res.render('index', {data: data});
    });

});

app.get('/movies', (req, res)=> {
    let query = req.query.search;
    request('https://api.themoviedb.org/3/search/movie?api_key=fad5bb3b32edd9618789493647bac9d5&query='+query, (err, response, body)=> {
        if(err){
            console.log("Error Occured : "+err);
        }

        var data = JSON.parse(body);

        res.render('movies', {data: data, searchQuery: query});
    });

    

});

const PORT = 80;
app.listen(process.env.PORT || PORT);