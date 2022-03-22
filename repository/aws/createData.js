var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing alerts into DynamoDB. Please wait.");

var allAlerts = JSON.parse(fs.readFileSync('alertData.json', 'utf8'));
allAlerts.forEach(function(alert) {
    var params = {
        TableName: "alertTableDev1",
        Item: {
            "id":  alert.id,
            "Alert": alert.alert,
            "info":  alert.info
        }
    };

    //console.log('params', params);

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add alert", alert.id, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", alert.id);
       }
    });
});