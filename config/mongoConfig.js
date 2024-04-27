const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const db_url = process.env.DATABASE_URL;
const mongoDB = db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Database connected.");
}
