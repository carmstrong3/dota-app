const Matchup = require("./models").Matchup;
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

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

  getTeamMatchups(callback) {
    return sequelize.query('SELECT matchup_id, SUM(wins / games_played::float) AS winrate FROM (SELECT matchup_id, wins, games_played FROM matchups WHERE heroId = 1 UNION ALL SELECT matchup_id, wins, games_played FROM matchups WHERE heroId = 2 UNION ALL SELECT matchup_id, wins, games_played FROM matchups WHERE heroId = 3) AS t GROUP BY matchup_id ORDER BY winrate DESC', { model: Matchup }).then(matchups => { console.log(matchup) })
    .then((matchup) => {
      callback(null, matchup);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getTopMatchups(hero_id, callback) {
   return Matchup.findAll()
      .then((matchup) => {
        callback(null, matchup);
      })
      .catch((err) => {
        callback(err);
      })
  },
}
