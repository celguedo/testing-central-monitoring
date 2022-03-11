var express = require("express");
var axios = require("axios")
var router = express.Router();

/* GET */
router.get("/mongodb", function (req, res, next) {
  console.log("req.query", req.query);
  console.log("req.url", req.url);

//identifica la data a buscar
//se consulta a la base de datos
//se formatea
//se envia

  res.send(
    JSON.stringify({
      message: "Llego a buscar datos",
      data: [
        { alert: "OUTSIDE_METRIC_THRESHOLD", type: "HOST_METRIC", total: 1 },
        { alert: "OUTSIDE_METRIC_THRESHOLD", type: "HOST_METRIC", total: 1 },
        { alert: "OUTSIDE_METRIC_THRESHOLD_3", type: "HOST_METRIC", total: 1 },
        { alert: "OUTSIDE_METRIC_THRESHOLD_2", type: "HOST_METRIC_2", total: 1 }
      ],
    })
  );
});

/* GET */
router.get("/site247", function (req, res, next) {
  

  res.send(
    JSON.stringify({
      message: "Llego a buscar datos de site 247",
      data: [
        { alert: "MAQUINA_POCA_MEMORIA", type: "RAM", total: 1 },
        { alert: "MAQUINA_POCA_MEMORIA", type: "RAM", total: 1 },
        { alert: "MAQUINA_POCO_ESPACIO", type: "DISC", total: 1 }
      ],
    })
  );
});

/* POST */
router.post("/mongodb", function (req, res, next) {
  
  res.send("Llego al endpoint recolector FROM source");
});

/* POST */
router.post("/site247", function (req, res, next) {
  
  res.send("Llego al endpoint recolector FROM source");
});

/* POST */
router.post("/aws", function (req, res, next) {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    let payload = JSON.parse(body)

    if (payload.Type === 'SubscriptionConfirmation') {
      const promise = new Promise((resolve, reject) => {
        const url = payload.SubscribeURL

        axios.post(url, {})
        .then(function (response) {
          console.log('AWS MANDA:', response);
          if (response.statusCode == 200) {
            console.log('Yess! We have accepted the confirmation from AWS')
            return resolve()
          }
        })
        .catch(function (error) {
          console.log(error);
          return reject()
        });
      })

      promise.then(() => {
        res.end("ok")
      })
    }else{
      const promise = new Promise((resolve, reject) => {
        const Subject = payload;
        console.log("🚀 ~ file: collector.js ~ line 91 ~ promise ~ Subject", Subject)
      })

      promise.then(() => {
        res.end("ok")
      })
    }
  })
  res.send('fin')
});

module.exports = router;
