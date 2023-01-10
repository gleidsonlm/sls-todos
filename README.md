# SLS ToDo'S 

Serverless (SLS) ToDo'S is a backend API to create and list tasks (todos) that you can incorporate into your applicaton.

It is built using [Serverless](https://www.serverless.com/) with Node.js, Express, AWS Lambda, and DynamoDB. In the current implementation, your will use it as a REST API endpoint. For developers, it provides the capability to run it locally.

## Installation

For this project, you will need:

    [  ] Node.js, preferable with NVM and NPM
    [  ] Serverless
        [  ] Serverless Offline
        [  ] Serverless DynamoDB

Install [Node.js, preferable with NVM and NPM] (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). 

Check the installation with the commands:
```
nvm -v
npm -v
node -v
```

Install all dependencies in the file ```package.json```, executing the following command within the project "root" directory.
``` 
npm install
```

Install Serverless as a global npm package.
``` 
npm install --global serverless
```

## Deployment

You can use the Serverless Offline Plugin to development stage. For production, you'll need to configure [AWS Credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

I recommend you to register in the Serverless site and take advantage of their Dashboard and Console.

You can deploy your application with:

``` 
serverless deploy
```

## Examples

You can create a new todo for an user by sending a POST request to the "todos/:userid" endpoint. The request must have a JSON object containing the "title" and "deadline" properties. Please, notice that ":userid" is a path parameter and will not be validated or managed in this service.

Here's an example to create a ToDo, returning the status code 201 without body content.

```
curl -X POST -H "Content-Type:application/json" https://`${YOUR_IDENTIFICATOR}`.execute-api.us-east-1.amazonaws.com/todos/`${YOUR_USER_ID}` --data '{ "title": "Learn Serverless", "deadline": "01-01-2024 00:00:00" }'
```

You can retrive existent todo for an user by sending a GET request to the "todos/:userid" endpoint. Example:

```
curl -X GET https://`${YOUR_IDENTIFICATOR}`.execute-api.us-east-1.amazonaws.com/todos/`${YOUR_USER_ID}`
```

This will return status code 200 with an array with "ToDo" JSON objects. If no ToDo was found for the user, it returns an empty array. For example:

```
[{"id":`${YOUR_TODO_ID}`,"title":"Learn Serverless","deadline":"01-01-2024 00:00:00","userid":`${YOUR_IDENTIFICATOR}`}]
```

## Local Development

It's possible with [Serverless Offline](https://github.com/dherault/serverless-offline) and [Serveles DynamoDB Local](https://github.com/99x/serverless-dynamodb-local) plugins to emulate DynamoDB, API Gateway and AWS Lambda locally.

You can start this development environment with the command:

```
serverless offline start
```

By default, local DynamoDB will run on "```http://localhost:8000```" and Serverless Offline  on "```http://localhost:3000/```".

## Wishlist
Some of the desirable features in the future:

    [   ] AWS Lambda functions to invoke locally.
    [   ] Unit and Integration tests.
    [   ] API Docs on the existent routes.
    [   ] Refactor ToDo entity for (in)complete, date of creation, update, completion and deletion.
    [   ] Implement new routes and functions
        [   ] List one specific ToDo
        [   ] Search for ToDo's by date and/or title.
        [   ] Check ToDo as (in)complete
