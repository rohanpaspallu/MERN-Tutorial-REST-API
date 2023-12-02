const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log(
      `mongodb connected : ${(await conn).connection.host}`.cyan.underline
    );
  } catch (e) {
    console.log("error is  : ", e);
    process.exit(1);
  }
};

module.exports = connectDB;
