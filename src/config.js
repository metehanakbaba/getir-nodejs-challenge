import { join } from 'path';

const config = {
  env: process.env.NODE_ENV || 'development',
  root: join(__dirname, '..'),
  http: {
    ip: process.env.HTTP_SERVER_IP || '0.0.0.0',
    port: process.env.HTTP_SERVER_PORT || 9000,
    apiRoot: process.env.HTTP_SERVER_API_ROOT || ''
  },
  mongo: {
    uri: process.env.DB_MONGO_URI || '',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      /** The name of the database you want to use.
       * If not provided, Mongoose uses the database name from connection string. */
      dbName: process.env.DB_MONGO_DATABASENAME || null
    }
  }
};

export default config;
