import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import mongoose from './services/mongoose';
import {
  validationErrorHandler,
  serverErrorHandler,
  notFoundHandler
} from './services/response';
import route from './route';

const { http, mongo } = config;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// raw
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

app.use(http.apiRoot, route);

const errorHandlers = [
  validationErrorHandler(),
  serverErrorHandler(),
  notFoundHandler()
];
errorHandlers.forEach((errorHandler) => app.use(errorHandler));

const { uri, options } = mongo;
mongoose.connect(uri, options);

app.listen(http.port, () => {
  console.log(
    `[Getir Case Study] app listening at http://localhost:${http.port}`
  );
});

export default app;
