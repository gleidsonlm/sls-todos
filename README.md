# SLS ToDo'S 

Serverless (SLS) ToDo'S is a backend API to create and read tasks (todos) that you can incorporate into your applicaton.
It is built using [Serverless](https://www.serverless.com/) with Node.js, Express, AWS Lambda, and DynamoDB. In the current implementation, your will use it as a REST API endpoint. For developers, this project also provides the capabilities to run AWS Lambda functions offline and local DynamoDB.

## Installation

For this project, you will need:

    [  ] Node.js, preferable with NVM and NPM
    [  ] Serverless
        [  ] Serverless Offline
        [  ] Serverless DynamoDB

Install Node.js, preferable with NVM and NPM. Check the installation with the commands:
```
node -v
npm -v
nvm -v
```

I recommend you to install Serverless it as global.
``` 
npm install --global serverless
```

You can use the Serverless Offline Plugin to development stage. For production, you need to configure a [AWS Credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).


With Node.js and NPM installed, execute the following command within the project "root" directory.
``` 
npm install
```

## Deployment

I recommend you to register in the Serverless site and take advantage of their Dashboard and Console. 
This will create the Cloud Stack Formation necessary to run your application in production using AWS Lambda and DynamoDB.

If you are already registered you can deploy your application.

``` 
serverless deploy
```

## Invocation

After the sucessful deployment, you can create a new todo for an user by sending a POST request to the "todos/:userid" endpoint, with a JSON object containing the "title" and "deadline" properties.

Please, notice that ":userid" is a path parameter and will not be validated in the "ToDo" function. Here's an example:

```
curl -X POST -H "Content-Type:application/json" https://`${YOUR_IDENTIFICATOR}`.execute-api.us-east-1.amazonaws.com/todos/`${YOUR_USER_ID}` --data '{ "title": "Learn Serverless", "deadline": "01-01-2024 00:00:00" }'
```

If successful, this will return status code 201 without body content.

You can retrive existent todo for an user by sending a GET request to the "todos/:userid" endpoint. Example:

```
curl -X GET https://`${YOUR_IDENTIFICATOR}`.execute-api.us-east-1.amazonaws.com/todos/`${YOUR_USER_ID}`
```

If sucessful, this will return status code 200 with a "ToDo" JSON object, for example:

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