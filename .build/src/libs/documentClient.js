"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentClient = void 0;
var dynamodb_1 = require("aws-sdk/clients/dynamodb");
var options = function () {
    if (process.env.IS_OFFLINE) {
        return {
            region: "localhost",
            endpoint: "http://localhost:8000",
            accessKeyId: "DEFAULT_ACCESS_KEY",
            secretAccessKey: "DEFAULT_SECRET", // needed if you don't have aws credentials at all in env
        };
    }
    return {};
};
var documentClient = new dynamodb_1.DocumentClient(options());
exports.documentClient = documentClient;
//# sourceMappingURL=documentClient.js.map