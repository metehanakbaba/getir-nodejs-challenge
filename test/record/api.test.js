import supertest from 'supertest';
import express from '../../src/services/express';
import mongoose from '../../src/services/mongoose';
import routes from '../../src/route';
import httpStatus from '../../src/utils/httpStatus';
import responseCode from '../../src/utils/responseCode';
import config from '../../src/config';

const { mongo, http } = config;
const { uri, options } = mongo;
const { pathApiRoot, port } = http;

beforeAll(() => {
  mongoose.connect(uri, options);
});

afterAll(() => {
  mongoose.disconnect();
});

const app = express(routes, pathApiRoot, port);
const request = supertest(app);

it('404 page test', (done) => {
  const { NOT_FOUND } = httpStatus;
  const { NOT_FOUND: NOT_FOUND_CODE } = responseCode;
  supertest(app).get('/test').then(({ status, body }) => {
    expect(status).toBe(NOT_FOUND);
    expect(body.code).toBe(NOT_FOUND_CODE);
    done();
  });
});

it('gets the records endpoint', (done) => {
  const { OK } = httpStatus;
  const { SUCCESS } = responseCode;
  const postData = {
    startDate: '2001-01-26',
    endDate: '2023-02-02',
    minCount: 180,
    maxCount: 200
  };
  request
    .post('/records')
    .send(postData)
    .then(({ status, body }) => {
      expect(status).toBe(OK);
      expect(body.code).toBe(SUCCESS);
      expect(body).toHaveProperty('records');
      expect(body.records instanceof Array).toBe(true);
      // here can then be elaborated
      done();
    });
});

it('validation test for the records endpoint', (done) => {
  const { BAD_REQUEST } = httpStatus;
  const { ERROR_VALIDATION } = responseCode;
  request
    .post('/records')
    .send({})
    .then(({ status, body }) => {
      expect(status).toBe(BAD_REQUEST);
      expect(body.code).toBe(ERROR_VALIDATION);
      // here can then be elaborated
      done();
    });
});
