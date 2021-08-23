import config from './config';
import mongoose from './services/mongoose';
import express from './services/express';
import router from './route';

const { mongo, http } = config;
const { uri, options } = mongo;
const { port, pathApiRoot } = http;

express(router, pathApiRoot, port);

mongoose.connect(uri, options);
