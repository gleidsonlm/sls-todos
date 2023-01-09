import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as express from "express";

const app = express();
app.use(express.json());

interface IDocumentClientParams {
  TableName: string;
  Item?: object;
  Key: object;
}
// interface IDocumentClientItem {
//   id: string;
//   userid: string;
//   title: string;
//   deadline: string;
// }

const options = () => {
  if (process.env.IS_OFFLINE) {
    return {
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY", // needed if you don't have aws credentials at all in env
      secretAccessKey: "DEFAULT_SECRET", // needed if you don't have aws credentials at all in env
    };
  }
  return {};
};
const documentClient = new DocumentClient(options());
const todos = process.env.tableName as string;

app.get(
  "/todos/:id",
  async (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    const params: IDocumentClientParams = {
      TableName: todos,
      Key: { id },
    };

    try {
      const item = await documentClient.get(params).promise();

      if (!item.Item) {
        return response
          .status(404)
          .json({ error: `ToDo not found by id ${id}` });
      }

      return response.send(200).json(item.Item);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
);

/* app.post("/users", async function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    response.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    response.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    response.json({ userId, name });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Could not create user" });
  }
}); */

// eslint-disable-next-line import/prefer-default-export
export { app };
