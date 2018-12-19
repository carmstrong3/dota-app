const Hero = require("./models").Hero;

module.exports = {

  // define function to return list of all heroes
  getAllHeroes(callback){
    return Hero.all()
    .then((heroes) => {
      callback(null, heroes);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addHero(newHero, callback){
    return Hero.create({
      hero_id: newHero.id,
      name: newHero.name,
      localized_name: newHero.localized_name,
      primary_attr: newHero.primary_attr,
      attack_type: newHero.attack_type,
      roles: newHero.roles
    })
    .then((hero) => {
      callback(null, hero);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
