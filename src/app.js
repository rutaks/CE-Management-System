import express from "express";
import env from "custom-env";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import flashMessages from "connect-flash";

import apiRoutes from "./routes/api.routes";
import staticRoutes from "./routes/static.routes";

import ErrorHandler from "./helpers/error-handler";

env.env();

const app = express();
const port = process.env.PORT || 3000;
const MongoDBStore = MongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});

store.on("error", function(error) {
  console.error("ERR:", error);
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

const handleError = (err, res) => {
  const { statusCode, message } = err;
  return res.render("auth/message-window", {
    title: statusCode,
    heading: `Oh No, ${statusCode}. Something Has Happened`,
    message: message
  });
};

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.account = req.session.account;
  next();
});

app.use("/", staticRoutes);
app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  handleError(err, res);
});

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
