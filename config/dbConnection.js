const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`MongoDB Connected: ${connect.connection.host} ${connect.connection.name}`);
  }catch(err){
    console.log(err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose. It exports the connectDB function, which attempts to connect to the database using the connection string stored in the environment variable CONNECTION_STRING. If the connection fails, it logs the error and exits the process with a failure status.  