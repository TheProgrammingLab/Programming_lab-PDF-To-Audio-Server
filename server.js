const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const app = require("./app.js");

const { DATABASE_PASSWORD, DATABASE } = process.env;

async function connectDB() {
  try {
    const db = await mongoose.connect(
      DATABASE.replace("<db_password>", DATABASE_PASSWORD)
    );
    console.log("MongoDB data connected");
  } catch (err) {
    console.log("Error connecting to mongoDB: ", err);
  }
}

connectDB();
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "hello, from PL PDF-Audio converter" });
});

app.listen(8000, () => {
  console.log(`Listening on port 8000`);
});
