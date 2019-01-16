const express = require('express');
const path = require('path');
const requestpn = require('request-promise-native');
const request = require('request');
const EventEmitter = require('events').EventEmitter;
const app = express();
const heroQueries = require("./db/queries.heroes.js");
const matchupQueries = require("./db/queries.matchups.js");
const itemQueries = require("./db/queries.items.js");


const port = process.env.PORT || 5000;
app.listen(port);


// resting home
app.get('/', (req, res) => {
  res.send("server home page");

});

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

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

// api endpoint to pull up a specific hero by their id
app.get(`/api/heroes/:id`, (req, res) => {
  heroQueries.getHero(req.params.id, (err, hero) => {
    if(err){
      console.log(err);
    } else {
      res.send(hero);
    }
  });
}); 



/* pseudocode for getting top per role
  init roles
  call topPicks
  For JSON returned..
    PER role
      init counter
      call getHero 
      IF hero has specified role, set role value to hero
      ELSE counter += 1
      call getHero recursively until hero with role is found
    CLOSE
  RETURN roles objects.
*/

// api endpoint to give top pick suggestion per role.    
app.get(`/api/heroes/:id/picks/role`, (req, res) => {


});
// An page to update database 
app.get('/update/heroes', (req,res) => {
  var heroes = [];
  
  res.send("updating");
  
  requestpn('https://api.opendota.com/api/heroes', (err, res, body) => {
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
app.get(`/update/matchups/:id`, (req,res) => {

// Set a basic text response on the page  
  res.send("updating");

// recursive function
  const getMatchups = (id) => {
    return requestpn(`https://api.opendota.com/api/heroes/${id}/matchups`, (err, res, body) => {
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

  getMatchups(req.params.id);

});

// A page to update database's list of hero itemTimings page 1 
app.get('/update/items/1', (req,res) => {

// Set a basic text response on the page  
  res.send("updating");

// Iterate over the hero id's (up to 60 to limit calls/min)
  for(let i=10; i < 11; i++){
    var timings = [];
// Request the itemTiming page for each hero by page #.      
    requestpn(`https://api.opendota.com/api/scenarios/itemTimings?hero_id=${i}`, (err, res, body) => {
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


// An page to update database's list of hero matchups 
app.get(`/api/heroes/matchups`, (req,res) => {

// Set a basic text response on the page  
  matchupQueries.getAllMatchups((err, matchups) => {
    if(err){
      console.log(err);
    } else {
      res.send(matchups)
    }
  });


});

// BEGIN HEROES/{ID}/MATCHUPS PAGES 

// An page to update database's list of anti-mage matchups 
app.get(`/api/heroes/:id/matchups`, (req,res) => {

// Set a basic text response on the page  
  matchupQueries.getHeroMatchups(req.params.id, (err, matchups) => {
    if(err){
      console.log(err);
    } else {
      res.send(matchups)
    }
  });
});

// END HEROES/{ID}/MATCHUPS PAGES 

// BEGIN HEROES/{ID}/MATCHUPS/{MATCHUPID} PAGES


app.get(`/api/heroes/:id/matchups/:matchupid`, (req,res) => {

// Set a basic text response on the page  
  matchupQueries.getMatchup(req.params.id, req.params.matchupid, (err, matchup) => {
    if(err){
      console.log(err);
    } else {
      console.log("no err");
      res.send(matchup)
    }
  });
});


// END HEROES/{ID}/MATCHUPS/{MATCHUPID} PAGES

// top picks
app.get (`/api/heroes/:id/picks/top`, (req, res) => {
  const wilson = (x, n) => {
    let z = 1.96;
    let p = x / n;
    let inner = Math.sqrt((p * (1-p)) / n)
    let toHundredth = num => {return Math.ceil(num * 1000) / 100};
    return p - z * inner; 
  }; 
  matchupQueries.getHeroMatchups(req.params.id, (err, matchups) => {
    if(err){
      console.log(err);
    } else {
     let wilsonMatchups = (matchups) => {
       return matchups.map((matchup) => wilson(matchup.wins, matchup.games_played))};
     let topPicks = matchups.sort((a, b) => {
       return (wilson(b.wins, b.games_played)) - (wilson(a.wins, a.games_played))
     }); 
     let isStatisticallySignificant = value => { return value.games_played >= 10 && wilson(value.wins, value.games_played) > .5}; 
     let filteredPicks = topPicks.filter(isStatisticallySignificant); 
      res.send(filteredPicks)
    }
  });
});

// bottom picks
app.get (`/api/heroes/:id/picks/bottom`, (req, res) => {
  const wilson = (x, n) => {
    let z = 1.96;
    let p = x / n;
    let inner = Math.sqrt((p * (1-p)) / n)
    let toHundredth = num => {return Math.ceil(num * 1000) / 100};
    return p + z * inner; 
  }; 
  matchupQueries.getHeroMatchups(req.params.id, (err, matchups) => {
    if(err){
      console.log(err);
    } else {
     let wilsonMatchups = (matchups) => {
       return matchups.map((matchup) => wilson(matchup.wins, matchup.games_played))};
     let topPicks = matchups.sort((a, b) => {
       return (wilson(a.wins, a.games_played)) - (wilson(b.wins, b.games_played))
     }); 
     let isStatisticallySignificant = value => { return value.games_played >= 10 && wilson(value.wins, value.games_played) < .5}; 
     let filteredPicks = topPicks.filter(isStatisticallySignificant); 
      res.send(filteredPicks)
    }
  });
});


console.log('App is listening on port ' + port);
