require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");


module.exports = {
  init(app, express){
    app.use(bodyParser.urlencoded({ extended: true}));
    // Serve the static files from the React app
    app.use(express.static(path.join(__dirname, 'client/build')));
  }
};
