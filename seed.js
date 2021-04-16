const mongoose = require("mongoose"),
    User = require("./models/user");

mongoose.connect(
    "mongodb://localhost:27017/fakebook",
    { useNewUrlParser: true}
);

mongoose.connection;

var users = [
    {
        name:{
            first: "Andy",
            last: "Le",
        },     
        email: "andy.le@ucdenver.edu",
        userName: "anle",
        gender: "male",
        DOB: "03/23/1993",
        city: "Broomfield",
        state: "CO",
        biography: "",
        password: "strongpassword123",
        securityQuestion: "What is the name of your first pet?",
        securityAnswer: "Oreo"
    },
    {
        name:{
            first: "test",
            last: "dummy",
        },     
        email: "test@dummy.edu",
        userName: "testdummy",
        gender: "male",
        DOB: "04/21/1995",
        city: "Broomfield",
        state: "CO",
        biography: "",
        password: "strongpassword123",
        securityQuestion: "What is the name of your first pet?",
        securityAnswer: "Sprinkles"
    },
    {
        name:{
            first: "Jacques",
            last: "Steyn",
        },     
        email: "jacques.steyn@ucdenver.edu",
        userName: "jsteyn",
        gender: "male",
        DOB: "04/20/2000",
        city: "denver",
        state: "CO",
        biography: "asdasdasd",
        password: "strongpassword123",
        securityQuestion: "What is the name of your first pet?",
        securityAnswer: "jebidiah"
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