const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');
let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database already initialized');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db('cse341-projectII');
      console.log(' Connected to MongoDB');
      callback(null, database);
    })
    .catch((err) => {
      console.error(' MongoDB connection failed:', err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) throw Error('Database not initialized');
  return database;
};

module.exports = { initDb, getDatabase };
