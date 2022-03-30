const isEmpty = require("lodash/isEmpty");

const alarmsFields = ["Id", "Source", "Service", "Info", "Date"];

const formatDate = (date) => {
  const dateReceived = new Date(date);
  year = dateReceived.getFullYear();
  month = dateReceived.getMonth() + 1;
  dt = dateReceived.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return (
    "" +
    year +
    month +
    dt +
    dateReceived.getHours() +
    dateReceived.getMinutes() +
    dateReceived.getSeconds()
  );
};

const formatDateFromConnector = (date) => {
  const dateReceived = new Date(date);
  //console.log("🚀 ~ file: helper.js ~ dateReceived", dateReceived);
  year = dateReceived.getUTCFullYear();
  month = dateReceived.getUTCMonth() + 1;
  dt = dateReceived.getUTCDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  //console.log("🚀 ~ file: helper.js ~ dt", "" + year + month + dt);
  return year + month + dt;
};

const buildFields = () => {
  let ExpressionAttributeNames = {};
  let ProjectionExpression = "";

  alarmsFields.forEach((field) => {
    ExpressionAttributeNames[`#${field}`] = field;
    if (isEmpty(ProjectionExpression)) ProjectionExpression += `#${field}`;
    else ProjectionExpression += `,#${field}`;
  });

  return { ExpressionAttributeNames, ProjectionExpression };
};

const buildExpressions = (filters, dateRange) => {
  const dateRanges = dateRange.split(":");
  let ExpressionAttributeValues = {};
  let FilterExpression = "";

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      if (key === "Date") {
        ExpressionAttributeValues[`:Date1`] =
          formatDateFromConnector(dateRanges[0]) + "000000";
        ExpressionAttributeValues[`:Date2`] =
          formatDateFromConnector(dateRanges[1]) + "235959";

        if (isEmpty(FilterExpression))
          FilterExpression += `#${key} >= :Date1 and #${key} <= :Date2`;
        else FilterExpression += ` and #${key} >= :Date1 and #${key} <= :Date2`;
      } else {
        ExpressionAttributeValues[`:${key}`] = filters[key];
        if (isEmpty(FilterExpression)) FilterExpression += `#${key} = :${key}`;
        else FilterExpression += ` and #${key} = :${key}`;
      }
    }
  });

  return { ExpressionAttributeValues, FilterExpression };
};

const queryBuilder = (filters, dateRange) => {
  const { ExpressionAttributeNames, ProjectionExpression } = buildFields();
  const { ExpressionAttributeValues, FilterExpression } = buildExpressions(
    filters,
    dateRange
  );

  if (isEmpty(ExpressionAttributeValues)) return {};
  return {
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    FilterExpression,
    ProjectionExpression,
  };
};

module.exports = {
  queryBuilder,
  formatDate,
};
