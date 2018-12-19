const express = require('express'):
const router = express.Router();

const heroController = require("../controllers/heroController");

router.get("api/heroes", heroController.index);

module.exports = router;
