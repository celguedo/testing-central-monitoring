var express = require("express");
var axios = require("axios");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const dynamoHelp = require("../repository/aws/saveData");
const { formatDate } = require('../repository/aws/helper');

/* GET */
router.get("/site247", function (req, res, next) {
  res.send(
    JSON.stringify({
      message: "Llego a buscar datos de site 247",
      data: [
        { alert: "MAQUINA_POCA_MEMORIA", type: "RAM", total: 1 },
        { alert: "MAQUINA_POCA_MEMORIA", type: "RAM", total: 1 },
        { alert: "MAQUINA_POCO_ESPACIO", type: "DISC", total: 1 },
      ],
    })
  );
});

/* POST */
router.post("/mongodb", async function (req, res, next) {
  const data = req.body;
  console.log('Hola, date recibida:',data.created);
  console.log('Hola, date formateada:',formatDate(data.created))
  await dynamoHelp.save({
    Id: uuidv4(),
    Info: data,
    Service: data.replicaSetName,
    Source: "MONGO_ATLAS",
    Date: formatDate(data.created)
  });
  res.send("Llego al endpoint recolector MONGO_ATLAS");
});

/* POST */
router.post("/site247", async function (req, res, next) {
  const data = req.body;
  await dynamoHelp.save({
    Id: uuidv4(),
    Info: data,
    Service: data.MONITORURL,
    Source: "SITE_247",
    Date: formatDate(data.INCIDENT_TIME_ISO)
  });
  res.send("Llego al endpoint recolector SITE_247");
});

/* POST */
router.post("/aws", function (req, res, next) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    let payload = JSON.parse(body);
    if (payload.Type === "SubscriptionConfirmation") {
      const promise = new Promise((resolve, reject) => {
        const url = payload.SubscribeURL;
        axios
          .post(url, {})
          .then(function (response) {
            console.log("AWS MANDA:", response);
            if (response.statusCode == 200) {
              console.log("Yess! We have accepted the confirmation from AWS");
              return resolve();
            }
          })
          .catch(function (error) {
            console.log(error);
            return reject();
          });
      });

      promise.then(() => {
        res.end("ok");
      });
    } else {
      const promise = new Promise((resolve, reject) => {
        console.log("AWS Llego:", Subject);
      });

      promise.then(() => {
        res.end("ok");
      });
    }
  });
  res.send("fin");
});

/* POST */
router.post("/metrics", function (req, res, next) {
  console.log("METRICS: Llego:", req.body);
  res.send("Llego al endpoint recolector FROM source");
});

/* POST */
router.post("/apm", function (req, res, next) {
  console.log("Elastic APM: Llego:", typeof req.body);
  res.send("Llego al endpoint recolector FROM source");
});

module.exports = router;
