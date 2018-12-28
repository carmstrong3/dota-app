const Item = require("./models").Item;

module.exports = {
   
  // define function to return all items
  getAllItems(callback) { 
    return Item.findAll()
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  },
   
  // define function to add items to database
  addItem(newItem, callback) {
    return Item.create({
      hero_id: newItem.hero_id, 
      item: newItem.item,
      time: newItem.time,
      games: newItem.games,
      wins: newItem.wins,
    })
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  }


}

