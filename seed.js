const mongoose = require("mongoose"),
    User = require("./models/user");

mongoose.connect(
    "mongodb://localhost:27017/fakebook",
    { useNewUrlParser: true}
);

mongoose.connection;

var users = [
    {
        firstName: "Andy",
        lastName: "Le",
        userName: "Andy.Le",
        email: "andy.le@ucdenver.edu",
        gender: "male",
        DOB: "03/23/1993",
        city: "Broomfield",
        state: "CO",
        biography: "",
        password: "strongpassword123",
        securityQuestion: "What is the name of your first pet?",
        answer: "Oreo"
    }
];

User.deleteMany()
    .exec()
    .then(() => {
        console.log("User data is empty!");
    });

var commands = [];

users.forEach((user) => {
    commands.push(User.create(user))});

Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });