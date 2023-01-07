"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTodoByUser = void 0;
var uuid_1 = require("uuid");
var dynamoDbClient_1 = require("../libs/dynamoDbClient");
var postTodoByUser = function (event, context, callback) {
    if (!event.body) {
        callback(null, {
            statusCode: 400,
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
                message: "Please pass a valid text field",
            }),
        });
    }
    var data = JSON.parse(String(event.body));
    var userid = event.pathParameters;
    var params = {
        TableName: "".concat(process.env.TODOS_TABLE),
        Item: {
            id: (0, uuid_1.v4)(),
            userid: userid,
            title: data.title,
            done: false,
            deadline: new Date(data.deadline),
        },
    };
    // write the todo to the database
    dynamoDbClient_1.dynamoDbClient.put(params, function (error, result) {
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
exports.postTodoByUser = postTodoByUser;
//# sourceMappingURL=postTodos.js.map