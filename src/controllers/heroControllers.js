module.exports = {
  index(req, res, next){
    heroQueries.getAllHeroes((err, heroes) => {
      if(err){
        res.redirect(500, "index");
      } else {
        res.render("api/heroes/index", {heroes});
      }
    })
  }
}
