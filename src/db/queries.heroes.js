const Hero = require("./models").Hero;

module.exports = {

  // define function to return list of all heroes
  getAllHeroes(callback){
    return Hero.findAll()
    .then((heroes) => {
      callback(null, heroes);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addHero(newHero, callback){
    return Hero.create({
      hero_id: newHero.hero_id,
      name: newHero.name,
      localized_name: newHero.localized_name,
      primary_attr: newHero.primary_attr,
      attack_type: newHero.attack_type,
      roles: newHero.roles,
      image: newHero.image
    })
    .then((hero) => {
      callback(null, hero);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getHero(id, callback){
    return Hero.findById(id)
    .then((hero) => {
      callback(null, hero)
    })
    .catch((err) => {
      callback(err)
    })
  },
  updateAllImages(callback){
    return Hero.findAll()
    .then((heroes) => {
      heroes.image = `http://cdn.dota2.com/apps/dota2/images/heroes/${heroes.localized_name}_full.png`;
      callback(null, heroes);
    })
    .catch((err) => {
      callback(err)
    })
  }
}
