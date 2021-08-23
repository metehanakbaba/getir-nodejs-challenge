import supertest from 'supertest';
import express from '../../src/services/express';
import mongoose from '../../src/services/mongoose';
import routes from '../../src/route';
import httpStatus from '../../src/utils/httpStatus';
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
  supertest(app).get('/test').then(({ status }) => {
    expect(status).toBe(NOT_FOUND);
    done();
  });
});

it('gets the records endpoint', (done) => {
  const { OK } = httpStatus;
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
      expect(body).toHaveProperty('records');
      expect(body.records instanceof Array).toBe(true);
      // here can then be elaborated
      done();
    });
});

it('validation test for the records endpoint', (done) => {
  const { BAD_REQUEST } = httpStatus;
  request
    .post('/records')
    .send({})
    .then(({ status }) => {
      expect(status).toBe(BAD_REQUEST);
      // here can then be elaborated
      done();
    });
});
