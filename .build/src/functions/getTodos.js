"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodosByUser = void 0;
var dynamoDbClient_1 = require("../libs/dynamoDbClient");
var getTodosByUser = function (event, context, callback) {
    var userid = event.pathParameters;
    if (!userid) {
        callback(null, {
            statusCode: 400,
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify("Missing user id"),
        });
    }
    var params = {
        TableName: "".concat(process.env.TODOS_TABLE),
        Key: { userid: userid },
    };
    dynamoDbClient_1.dynamoDbClient.get(params, function (error, result) {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify("Could not get your todos"),
            });
        }
        var response = {
            statusCode: 200,
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(result.Item),
        };
        callback(null, response);
    });
};
exports.getTodosByUser = getTodosByUser;
//# sourceMappingURL=getTodos.js.map