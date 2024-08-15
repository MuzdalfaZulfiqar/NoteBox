const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name :{
        type : String,
        required : true
    }
    , 
    email : {
        type : String,
        required : true
    }
    ,
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

// Takes two parameters name of the model and the model you created(your schema)
let User = mongoose.model("user", UserSchema);
// User.createIndexes()  now this dupication will be handled in route js 
module.exports = User