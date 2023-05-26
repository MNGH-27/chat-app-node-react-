const mongoose = require("mongoose");
// const { DB_CONNECTION_URL } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
