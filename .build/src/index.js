"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var serverlessExpress = require("aws-serverless-express");
var app_1 = require("./app");
var server = serverlessExpress.createServer(app_1.app);
// eslint-disable-next-line import/prefer-default-export
var handler = function (event, context) {
    serverlessExpress.proxy(server, event, context);
};
exports.handler = handler;
//# sourceMappingURL=index.js.map