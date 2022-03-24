var express = require("express");
//var axios = require("axios")
var router = express.Router();
//const { v4: uuidv4 } = require('uuid');
const dynamoHelp = require("../repository/aws/getData");

/* GET */
router.get("/MONGO_ATLAS", async (req, res) => {
  const result = await dynamoHelp.get({
    source: "MONGO_ATLAS",
    service: "scraping",
  });

  res.send([result.Item]);
});

module.exports = router;
