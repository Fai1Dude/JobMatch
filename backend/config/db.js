const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://sweproject363:%40QAZwsxEDC2003@jobmatchcluster.y0mu5.mongodb.net/myDatabase?retryWrites=true&w=majority";
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('MongoDB Connection Error Details:', error);
    process.exit(1);
  }
};

module.exports = connectDB;