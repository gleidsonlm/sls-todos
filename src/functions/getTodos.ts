/* eslint-disable import/prefer-default-export */
import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamoDbClient } from "../libs/dynamoDbClient";

export const getTodosByUser: APIGatewayProxyHandler = (
  event,
  context,
  callback
) => {
  const userid = event.pathParameters;

  if (!userid) {
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify("Missing user id"),
    });
  }

  const params = {
    TableName: `${process.env.TODOS_TABLE}`,
    Key: { userid },
  };

  dynamoDbClient.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify("Could not get your todos"),
      });
    }

    const response = {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
