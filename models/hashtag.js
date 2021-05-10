const mongoose = require("mongoose"),
    {Schema} = mongoose,
    Post = require("./post"),

hashtagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    posts: [{type: Schema.Types.ObjectId, ref: Post}]
},
{
    timeStamps: true
});

module.exports = mongoose.model("Hashtag", hashtagSchema);