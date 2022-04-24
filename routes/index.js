const express = require('express');
const router = express.Router();
const sendResponse = require('../helpers/utility');
/* GET home page. */
router.get('/', function(req, res, next) {
  return sendResponse({}, 200, "home", res, next);
});

const companiesRoutes = require("./companies");
router.use("/companies", companiesRoutes);

module.exports = router;
