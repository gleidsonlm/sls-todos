import serverless from 'serverless-http'
import express from 'express';

const app = express();

module.exports.handler = serverless(app);
