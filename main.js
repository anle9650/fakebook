"use strict";


const express = require("express"),
app = express(),
router =  express.Router(),
layouts = require("express-ejs-layouts"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
expressSession = require("express-session"),
cookieParser = require("cookie-parser"),
connectFlash = require("connect-flash"),
expressValidator =  require("express-validator"),
passport = require("passport"),
homeController = require("./controllers/homeController"),
usersController = require("./controllers/usersController"),
errorController = require("./controllers/errorController"),
postsController = require("./controllers/postsController"),
User = require("./models/user");

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

router.use(methodOverride("_method", {methods:["POST","GET"]}));
app.use(express.json());
router.use(cookieParser("fakebook_passcode"));
router.use(expressSession({
    secret: "fakebook_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.use(expressValidator());
router.use(connectFlash());

router.use((req,res,next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});

app.use("/", router);

router.get("/home", homeController.index, homeController.indexView);

//router.get("/users",usersController.index, usersController.indexView);
router.get("/users/new",usersController.new);
router.post("/users/create",usersController.validate, usersController.create, usersController.redirectView);
router.get("/users/login",usersController.getLoginPage);
router.post("/users/login",usersController.authenticate);
router.get("/users/logout",usersController.logout,usersController.redirectView);
router.get("/users/:id", usersController.show,usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.validate,usersController.update, usersController.redirectView);
//router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.post("/posts/create",postsController.create, usersController.redirectView);




app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost: ${app.get("port")}`);
});