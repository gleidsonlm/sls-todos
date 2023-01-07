/* eslint-disable import/prefer-default-export */
import { DynamoDB } from "aws-sdk";

const isOffline = () => {
  return process.env.IS_OFFLINE;
};
const dynamoDbClientParams = {
  region: "localhost",
  endpoint: "http://localhost:8000",
};

export const dynamoDbClient = isOffline()
  ? new DynamoDB.DocumentClient(dynamoDbClientParams)
  : new DynamoDB.DocumentClient();
