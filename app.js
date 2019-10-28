import express from "express";
import env from "custom-env";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import mongodb from "mongodb";

import apiRoutes from "./routes/api.routes";

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
env.env();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to CE Management" });
});

app.use((req, res, next) => {
  const error = new Error("There was an error");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    error: {
      message: error.message
    }
  });
});

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    app.listen(port, () => {
      console.log(`CE Management Server running on ${port}`);
    });
  })
  .catch(err => {
    console.error("ERR: Could not connect to MongoDB, " + err);
  });
