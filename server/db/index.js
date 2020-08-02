const mongoose = require("mongoose");

let MONGO_URL;
const MONGO_LOCAL_URL = "mongodb://localhost:27017/ImageUpload";

const mongo_option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * MONGO URL CONNECTION (setup mongo atlas key in .env (or) local db will be activated)
 */
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, mongo_option);
  MONGO_URL = process.env.MONGO_URI;
} else {
  mongoose.connect(MONGO_LOCAL_URL, mongo_option);
  MONGO_URL = MONGO_LOCAL_URL;
}

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(`Error occured when connecting to the database`);
});
db.once("open", () => {
  console.log(
    `You have successfully connected to your mongo database: ${MONGO_URL}`
  );
});

module.exports = db;
