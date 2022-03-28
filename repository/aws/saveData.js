var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "alertTableDev01";

const save = async (alert) => {
  var params = {
    TableName: table,
    Item: {
      Id: alert.Id,
      Source: alert.Source,
      Service: alert.Service,
      Info: alert.Info
    },
  };

  try {
    return await docClient.put(params).promise();
  } catch (err) {
    console.log("Error:", err);
    return err;
  }
};

module.exports = {
  save,
};
