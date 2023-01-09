import * as serverlessExpress from "aws-serverless-express";
import { APIGatewayProxyHandler } from "aws-lambda";

import { app } from "./app";

const server = serverlessExpress.createServer(app);

// eslint-disable-next-line import/prefer-default-export
export const handler: APIGatewayProxyHandler = (event, context) => {
  serverlessExpress.proxy(server, event, context);
};
