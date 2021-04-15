"use strict";

const mongoose = require("mongoose"),
{Schema} = mongoose,
    postSchema = new Schema({
    
    content: {
        type: String,
        required: true
    },
    
},
{
    timeStamps: true,
});


module.exports = mongoose.model("Post", userSchema);