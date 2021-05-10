const mongoose = require("mongoose"),
{Schema} = mongoose,
User = require("./user"),
postSchema = new Schema({
    
    content: {
        type: String,
        required: true
    },
    user: {type: Schema.Types.ObjectId, ref: User}
},
{
    timeStamps: true,
});


module.exports = mongoose.model("Post", postSchema);