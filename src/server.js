const express = require('express');
const path = require('path');
const request = require('request-promise-native');
const EventEmitter = require('events').EventEmitter;
const app = express();
const heroQueries = require("./db/queries.heroes.js");
const matchupQueries = require("./db/queries.matchups.js");
const itemQueries = require("./db/queries.items.js");

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
  var heroes = [];
  
  res.send("updating");
  
  request('https://api.opendota.com/api/heroes', (err, res, body) => {
    if (!err && res.statusCode == 200) {
      var data = JSON.parse(body);
      for(let i=0; i< data.length; i++){
        heroes.push(data[i]);
      }
      for(let i=0; i< heroes.length; i++){
        var imageTemplate = heroes[i].localized_name.toLowerCase();
        var newHero = {
          hero_id: heroes[i].id,
          name: heroes[i].name,
          localized_name: heroes[i].localized_name,
          primary_attr: heroes[i].primary_attr,
          attack_type: heroes[i].attack_type,
          roles: heroes[i].roles,
          image: `http://cdn.dota2.com/apps/dota2/images/heroes/${imageTemplate}_full.png`
        };
        heroQueries.addHero(newHero, (err, hero) => {
          if(err){
            console.log(err)
          } else {
            console.log("no err")
          }
        });
      };
    };
  });
});

// An page to update database's list of hero matchups 
app.get('/update/matchups/1', (req,res) => {

// Set a basic text response on the page  
  res.send("updating");

// recursive function
  const getMatchups = (id) => {
    return request(`https://api.opendota.com/api/heroes/${id}/matchups`, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        let data = JSON.parse(body);
        let matchups = [];
        for(let j=0; j< data.length; j++){
          matchups.push(data[j]);
          var newMatchup = {
            matchup_id: matchups[j].hero_id,
            games_played: matchups[j].games_played,
            wins: matchups[j].wins,
            heroId: id,
          };
          matchupQueries.addMatchup(newMatchup, (err, matchup) => {
            if(err){
              console.log("query error: " + err)
            } else {
              console.log("filed")
            }
          });
        };
      } else {
        console.log("error: " +  err);
      };
    })
    .then(() => {
      id += 1;
      if (id < 61) {
        return getMatchups(id);
      } else {
        return
      }
    })
    .catch((err) => {
      console.log(err);
    }); 
  };

  getMatchups(1);

});

// An page to update database's list of hero matchups page 2 
app.get('/update/matchups/2', (req,res) => {

// Set a basic text response on the page  
  res.send("updating");

// recursive function
  const getMatchups = (id) => {
    return request(`https://api.opendota.com/api/heroes/${id}/matchups`, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        let data = JSON.parse(body);
        let matchups = [];
        for(let j=0; j< data.length; j++){
          matchups.push(data[j]);
          var newMatchup = {
            matchup_id: matchups[j].hero_id,
            games_played: matchups[j].games_played,
            wins: matchups[j].wins,
            heroId: id,
          };
          matchupQueries.addMatchup(newMatchup, (err, matchup) => {
            if(err){
              console.log("query error: " + err)
            } else {
              console.log("filed")
            }
          });
        };
      } else {
        console.log("error: " +  err);
      };
    })
    .then(() => {
      id += 1;
      if (id < 122) {
        return getMatchups(id);
      } else {
        return
      }
    })
    .catch((err) => {
      console.log(err);
    }); 
  };

  getMatchups(121);

});

/// A page to update database's list of hero itemTimings page 1 
app.get('/update/items/1', (req,res) => {

// Set a basic text response on the page  
  res.send("updating");

// Iterate over the hero id's (up to 60 to limit calls/min)
  for(let i=10; i < 11; i++){
    var timings = [];
// Request the itemTiming page for each hero by page #.      
    request(`https://api.opendota.com/api/scenarios/itemTimings?hero_id=${i}`, (err, res, body) => {
// Check for no error and statusCode 200
      if (!err && res.statusCode == 200) {
// Change body object via json.parse and store it in variable named 'data'
        var data = JSON.parse(body);
// Iterate over itemTimings that are returned via data variable        
        console.log(i);
        for(let j=0; j< data.length; j++){
          timings.push(data[j]);
            var newItem = {
              hero_id: timings[j].hero_id,
              item: timings[j].item,
              time: timings[j].time,
              games: timings[j].games,
              wins: timings[j].wins
            };
            itemQueries.addItem(newItem, (err, item) => {
              if(err){
                console.log("query error: " + err)
              } else {
                console.log("filed")
              }
            }); 
        }; 
      } else {
        console.log("error: " +  err);
      };
    });
  };
});

// A page to compare the winrates of two teams
app.get('/api/team/winrate', (req, res) => {
  res.send("hello");

// set team objects
  let teams = {
    radiant: {
      player1: {hero_id: ''}, 
      player2: {hero_id: ''},
      player3: {hero_id: ''},
      player4: {hero_id: ''},
      player5: {hero_id: ''},
      synergy: (player1, player2, player3, player4, player5) => {},
      winrate: (player1, player2, player3, player4, player5, dire) => {},
    },
    dire: {
      player1: {hero_id: ''}, 
      player2: {hero_id: ''},
      player3: {hero_id: ''},
      player4: {hero_id: ''},
      player5: {hero_id: ''},
      synergy: (player1, player2, player3, player4, player5) => {},
      winrate: (player1, player2, player3, player4, player5) => {},
    }
  }   
});


// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
