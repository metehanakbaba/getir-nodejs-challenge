import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

mongoose.connection.on('error', () => {
  process.exit(-1);
});

export default mongoose;

// source: https://github.com/farandal/stackassignment/blob/698290ac028b292c0aba9d74cbca62b4b602a222/backend/services/mongoose/index.js
