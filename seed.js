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
    },
    {
        firstName: "Jacques",
        lastName: "Steyn",
        userName: "Jacques.Steyn",
        email: "jacques.steyn@ucdenver.edu",
        gender: "male",
        DOB: "02/1/1000",
        city: "colorado",
        state: "CO",
        biography: "asdasddsa",
        password: "strongpassword1234",
        securityQuestion: "What is the name of your first pet?",
        answer: "jebidiah"
    },
    {
        firstName: "test",
        lastName: "dummy",
        userName: "dummy.test",
        email: "dummy.test@fakebook.com",
        gender: "male",
        DOB: "4/3/1200",
        city: "New York",
        state: "New York",
        biography: "im the test dummy",
        password: "dummyPassword1234",
        securityQuestion: "What is the name of your dummy pet?",
        answer: "sprinkles"
    }
    // needs more dummy data
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