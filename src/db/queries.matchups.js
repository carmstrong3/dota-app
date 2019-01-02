const Matchup = require("./models").Matchup;

module.exports = {
   
  // define function to return all matchups
  getAllMatchups(callback) { 
    return Matchup.findAll()
    .then((matchup) => {
      callback(null, matchup);
    })
    .catch((err) => {
      callback(err);
    })
  },
   
  // define function to add matchups to database
  addMatchup(newMatchup, callback) {
    return Matchup.create({
      matchup_id: newMatchup.matchup_id,
      games_played: newMatchup.games_played,
      wins: newMatchup.wins,
      heroId: newMatchup.heroId  
    })
    .then((matchup) => {
      callback(null, matchup);
    })
    .catch((err) => {
      callback(err);
    })
  },

  // define function to return a specific matchup
  getMatchup(hero_id, matchupId, callback){
    return Matchup.findAll({
      where: 
        {heroId: hero_id, 
        matchup_id: matchupId}
    })
    .then((matchup) => {
      callback(null, matchup);
    })
    .catch((err) => {
      callback(err);
    })
  },

  // define function to return all matchups for one hero
  getHeroMatchups(hero_id, callback) { 
    return Matchup.findAll({
      where: {
        heroId: hero_id
      }
    })
    .then((matchup) => {
      callback(null, matchup);
    })
    .catch((err) => {
      callback(err);
    })
  },
  
}
