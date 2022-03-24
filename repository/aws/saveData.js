var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "alertTableDev2";

const save = async (alert) => {

  var params = {
    TableName: table,
    Item: {
      Id: alert.Id,
      Service: alert.Service,
      Source: alert.Source,
      Info: alert.Info
    },
  };

  console.log("Adding a new item...");
  await docClient.put(params, function (err, data) {
    console.log("🚀 ~ file: saveData.js ~ line 26 ~ data", data)
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
