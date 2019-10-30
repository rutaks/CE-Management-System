import express from "express";
import env from "custom-env";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import mongodb from "mongodb";
import path from "path";

import apiRoutes from "./routes/api.routes";
import staticRoutes from "./routes/static.routes";

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
env.env();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", staticRoutes);
app.use("/api", apiRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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
