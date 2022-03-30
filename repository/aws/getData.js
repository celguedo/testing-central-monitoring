const AWS = require("aws-sdk");
const isEmpty = require("lodash/isEmpty");
const { queryBuilder } = require("./helper");

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
const get = async (options, dateRange) => {
  var docClient = new AWS.DynamoDB.DocumentClient();

  const searchParams = queryBuilder(options, dateRange);

  let items = [],
    params = {
      TableName: "alertTableDev01",
    };

  if (!isEmpty(searchParams)) {
    params = { ...params, ...searchParams };
  }

  const data = await docClient.scan(params).promise();
  items = data.Items;

  return items;
};

module.exports = {
  get,
};
