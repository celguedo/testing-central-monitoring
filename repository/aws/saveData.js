var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "alertTableDev1";


const save = async (alert) => {
  var params = {
    TableName: table,
    Item: {
      id: alert.id,
      Alert: alert.alert,
      info: alert.info,
    },
  };

  console.log("Adding a new item...");
   await docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Added item:", JSON.stringify(data));
    }
  });
};

module.exports = {
  save,
};
