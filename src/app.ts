/* eslint-disable import/prefer-default-export */
import { randomUUID } from "crypto";
import * as express from "express";
import { documentClient } from "./libs/documentClient";

const app = express();
app.use(express.json());

// const options = () => {
//   if (process.env.IS_OFFLINE) {
//     return {
//       region: "localhost",
//       endpoint: "http://localhost:8000",
//       accessKeyId: "DEFAULT_ACCESS_KEY", // needed if you don't have aws credentials at all in env
//       secretAccessKey: "DEFAULT_SECRET", // needed if you don't have aws credentials at all in env
//     };
//   }
//   return {};
// };
// const documentClient = new DocumentClient(options());
const todos = `${process.env.TODOS_TABLE}` as string;

app.get(
  "/todos/:userid",
  async (request: express.Request, response: express.Response) => {
    const { userid } = request.params;

    const params = {
      TableName: todos,
      IndexName: "useridIdx",
      KeyConditions: {
        userid: {
          ComparisonOperator: "EQ",
          AttributeValueList: [userid],
        },
      },
    };

    try {
      const userTodos = await documentClient.query(params).promise();

      return response.status(200).json(userTodos.Items);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
);

app.post(
  "/todos/:userid",
  async (request: express.Request, response: express.Response) => {
    const { userid } = request.params;

    const { title, deadline } = request.body;

    interface IPutParams {
      TableName: string;
      Item: IPutItemDTO;
    }
    interface IPutItemDTO {
      id: string;
      userid: string;
      title: string;
      deadline: string;
    }

    const params: IPutParams = {
      TableName: todos,
      Item: {
        id: `${randomUUID()}`,
        userid,
        title,
        deadline,
      },
    };

    try {
      await documentClient.put(params).promise();

      return response.status(201).send();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
);

export { app };
