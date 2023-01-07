"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamoDbClient = void 0;
/* eslint-disable import/prefer-default-export */
var aws_sdk_1 = require("aws-sdk");
var isOffline = function () {
    return process.env.IS_OFFLINE;
};
var dynamoDbClientParams = {
    region: "localhost",
    endpoint: "http://localhost:8000",
};
exports.dynamoDbClient = isOffline()
    ? new aws_sdk_1.DynamoDB.DocumentClient(dynamoDbClientParams)
    : new aws_sdk_1.DynamoDB.DocumentClient();
//# sourceMappingURL=dynamoDbClient.js.map