const express = require('express');
const path = require('path');
const request = require('request');
const EventEmitter = require('events').EventEmitter;
const app = express();
const heroQueries = require("./db/queries.heroes.js");


// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

/* saving this implementation for posterity
// An api endpoint that returns a list of all heroes in the game 
app.get('/api/heroes', (req,res) => {
  var heroes = new EventEmitter();
  var list;
  request('https://api.opendota.com/api/heroes', (err, res, body) => {
    if (!err && res.statusCode == 200) {
      heroes.list = JSON.parse(body);
      heroes.emit('update');
    }
  });

  heroes.on('update', () => {
    list = heroes.list;
    res.json(list);
  });
});
 
*/

// An api endpoint that returns a list of all heroes in the database 
app.get('/api/heroes', (req,res) => {
  heroQueries.getAllHeroes((err, heroes) => {
    if(err){
      console.log(err);
    } else {
    res.send(heroes);
    } 
  });
});

/* saving for posterity
// An api endpoint that returns a list of all matchups for a hero in the game 
app.get('/api/heroes/matchups', (req,res) => {

});

*/

// An page to update database 
app.get('/update', (req,res) => {
  var heroes = new EventEmitter();
  
  res.send("updating");
  
  request('https://api.opendota.com/api/heroes', (err, res, body) => {
    if (!err && res.statusCode == 200) {
      heroes.list = JSON.parse(body);
      console.log(heroes.list);
    }
  });

});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
