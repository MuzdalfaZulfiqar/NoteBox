const mongoose = require("mongoose");
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    // tag to mention what is if for
    tag : {
        type : String,
        default : "General"
    },
    date : {
        type : Date,
        default : Date.now,
    }
})

// Takes two parameters name of the model and the model you created(your schema)
module.exports = mongoose.model("notes", NotesSchema)