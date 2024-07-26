const mongoose = require('mongoose');

const uri = process.env.MONGO_DB_URI;

if (!uri) {
  console.error('MongoDB URI is not defined');
  process.exit(1); // Exit the application with an error
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Mongoose connection established successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  module.exports = mongoose.connection;