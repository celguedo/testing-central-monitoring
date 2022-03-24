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
        TableName: "alertTableDev2",
        Item: {
            "Id":  alert.Id,
            "Service": alert.Service,
            "Source":  alert.Source,
            "Info": alert.Info
        }
    };

    //console.log('params', params);

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add alert", alert.Id, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", alert.Id);
       }
    });
});