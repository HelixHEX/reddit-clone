/* Mongoose Connection */
import mongoose from "mongoose"
import assert from 'assert'

const url = 'mongodb://localhost/reddit-db';
mongoose.connect(
  url,
  {
    useNewUrlParser: true
  },
  function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to database');

    // db.close(); turn on for testing
  }
);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

export default mongoose.connection;