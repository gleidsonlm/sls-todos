import { DocumentClient } from "aws-sdk/clients/dynamodb";

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

// eslint-disable-next-line import/prefer-default-export
export { documentClient };
