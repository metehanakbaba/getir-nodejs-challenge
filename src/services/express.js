import express from 'express';
import bodyParser from 'body-parser';

import { log } from 'console';
import {
  validationErrorHandler,
  serverErrorHandler,
  notFoundHandler
} from './response';

export default (routes, pathApiRoot, port) => {
  const app = express();

  const errorHandlers = [
    validationErrorHandler(),
    serverErrorHandler(),
    notFoundHandler()
  ];

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // raw
  app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

  app.use(pathApiRoot, routes);

  errorHandlers.forEach((errorHandler) => app.use(errorHandler));

  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      log(
        `[Getir Case Study] app listening at http://localhost:${port}`
      );
    });
  }

  return app;
};
