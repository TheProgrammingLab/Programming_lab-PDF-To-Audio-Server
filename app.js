const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const uploadRouter = require("./routes/uploadRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth/", authRouter);
// app.use("/api/v1/user/", userRouter);
app.use("/api/v1/upload/", uploadRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `The route ${req.originalUrl} does not exist on the server`,
  });
});

module.exports = app;
