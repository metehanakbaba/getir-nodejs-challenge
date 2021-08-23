import mongoose from 'mongoose';
import Promise from 'bluebird';
import { log } from 'console';

mongoose.Promise = Promise;

mongoose.connection.on('error', () => {
  process.exit(-1);
});

mongoose.connection.on('reconnected', () => {
  log('MongoDB Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  log('MongoDB Connection Disconnected');
});

mongoose.connection.on('close', () => {
  log('MongoDB Connection Closed');
});

mongoose.connection.on('error', (error) => {
  log(`MongoDB Error: ${error}`);

  process.exit(1);
});
export default mongoose;
