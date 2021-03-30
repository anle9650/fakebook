"use strict";

const mongoose = require("mongoose"),
express = require("express"),
app = express(),
layouts = require("express-ejs-layouts"),
homeController = require("./controllers/homeController"),
usersController = require("./controllers/usersController"),
errorController = require("./controllers/errorController");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://localhost:27017/fakebook",
  {useNewUrlParser: true}
);

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.get("/", homeController.getHomePage);
app.get("/signup", usersController.getSignupPage);
app.get("/login", usersController.getLoginPage);
app.post("/signup", usersController.saveUser);
app.post("/login", usersController.verifyLogin);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost: ${app.get("port")}`);
});