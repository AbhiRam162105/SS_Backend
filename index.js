import mongoose from "mongoose";
import express from "express";
import loginRoute from "./routes/users.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGOKEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/login", loginRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
