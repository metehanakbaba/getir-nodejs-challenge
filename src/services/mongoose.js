import mongoose from 'mongoose';
import Promise from 'bluebird';
import { log } from 'console';

mongoose.Promise = Promise;

mongoose.connection.on('error', (error) => {
  log(`MongoDB Error: ${error}`);

  process.exit(1);
});

export default mongoose;
