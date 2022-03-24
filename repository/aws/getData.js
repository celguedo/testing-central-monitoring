var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

/**
 * Download data from the specified URL.
 *
 * @async
 * @function get
 * @param {string} options - The URL to download from.
 * @return {Promise<string>} The data from the URL.
 */
const get = async (options) => {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "alertTableDev2";

  var params = {
    TableName: table,
    Key: {
      Source: options.source,
      Service: options.service,
    },
  };

  const result = await docClient.get(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("GetItem succeeded:");
    }
  }).promise();

  return result;
};

module.exports = {
  get,
};
