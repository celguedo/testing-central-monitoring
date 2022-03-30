var express = require("express");
//var axios = require("axios")
var router = express.Router();
//const { v4: uuidv4 } = require('uuid');
const dynamoHelp = require("../repository/aws/getData");

/* GET */
router.get("/MONGO_ATLAS", async (req, res) => {
  const queryParams = req.query;
  
  const { dataRange } = queryParams;

  const result = await dynamoHelp.get(
    {
      Source: "MONGO_ATLAS",
      Date: dataRange
    },
    dataRange
  );

  res.send(result);
});

/* GET */
router.get("/SITE_247", async (req, res) => {
  const queryParams = req.query;
  const { dataRange } = queryParams;

  const result = await dynamoHelp.get(
    {
      Source: "SITE_247",
      Date: dataRange
    },
    dataRange
  );

  res.send(result);
});

module.exports = router;
