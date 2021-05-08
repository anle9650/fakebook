const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  router = require("./routes/index"),
  layouts = require("express-ejs-layouts"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
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

app.use(methodOverride("_method", {methods:["POST","GET"]}));
app.use(express.json());
app.use(cookieParser("fakebook_passcode"));
app.use(expressSession({
    secret: "fakebook_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(expressValidator());
app.use(connectFlash());

app.use((req,res,next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost: ${app.get("port")}`);
});