const mongoose = require("mongoose"),
    express = require("express"),
    router =  express.Router(),
    passport = require("passport"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    User = require("./models/user");

mongoose.connect(
    "mongodb://localhost:27017/fakebook",
    { useNewUrlParser: true}
);

mongoose.connection;

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

var users = [
    {
        name: {
            first:"Andy",
            last: "Le"
        },
        userName: "Andy.Le",
        email: "andy.le@ucdenver.edu",
        gender: "male",
        DOB: "03/23/1993",
        city: "Broomfield",
        state: "CO",
        biography: "",
        securityQuestion: "What is the name of your first pet?",
        securityAnswer: "Oreo"
    },
    {
        name: {
            first:"Jacques",
            last: "Steyn"
        },
        userName: "Jacques.Steyn",
        email: "jacques.steyn@ucdenver.edu",
        gender: "male",
        DOB: "02/1/1000",
        city: "colorado",
        state: "CO",
        biography: "asdasddsa",
        securityQuestion: "What is the name of your first pet?",
        securityAnswer: "jebidiah"
    },
    {
        name: {
            first: "test",
            last: "dummy"
        },
        userName: "dummy.test",
        email: "dummy.test@fakebook.com",
        gender: "male",
        DOB: "4/3/1200",
        city: "New York",
        state: "New York",
        biography: "im the test dummy",
        securityQuestion: "What is the name of your dummy pet?",
        securityAnswer: "sprinkles"
    }
];

User.deleteMany()
    .exec()
    .then(() => {
        console.log("User data is empty!");
    });

var commands = [];

users.forEach((user) => {
    commands.push(User.register(user, "strongpassword123")
    )});

Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });