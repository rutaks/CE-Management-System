import express from "express";
import env from "custom-env";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import mongodb from "mongodb";
import path from "path";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import flashMessages from "connect-flash";

import apiRoutes from "./routes/api.routes";
import staticRoutes from "./routes/static.routes";

import Account from "./models/account.model";

env.env();

const app = express();
const port = process.env.PORT || 3000;
const MongoDBStore = MongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});

store.on("error", function(error) {
  console.log(error);
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(flashMessages());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.account = req.session.account;
  next();
});

app.use("/", staticRoutes);
app.use("/api", apiRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    app.listen(port, () => {
      console.log(`CE Management Server running on ${port}`);
    });
  })
  .catch(err => {
    console.error("ERR: Could not connect to MongoDB, " + err);
  });

export default app;
