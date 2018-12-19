module.exports = {
  init(app){

  const heroRoutes = require("../routes/heroes");
  
  app.use(heroRoutes);  
 
  }
}
