/* eslint-disable import/prefer-default-export */
import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuid } from "uuid";
import { dynamoDbClient } from "../libs/dynamoDbClient";

export const postTodoByUser: APIGatewayProxyHandler = (
  event,
  context,
  callback
) => {
  if (!event.body) {
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        message: "Please pass a valid text field",
      }),
    });
  }
  const data = JSON.parse(String(event.body));
  const userid = event.pathParameters;

  const params = {
    TableName: `${process.env.TODOS_TABLE}`,
    Item: {
      id: uuid(),
      userid,
      title: data.title,
      done: false,
      deadline: new Date(data.deadline),
    },
  };

  // write the todo to the database
  dynamoDbClient.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 500,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify("Could not create your todo"),
      });
    }

    // create a response
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(result),
    });
  });
};
