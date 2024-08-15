const mongoose = require("mongoose");
const {Schema} = mongoose;

let todoSchema = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    description : {
        type : String
    },

    checked :{
        type : Boolean
    }
     
})


// Takes two parameters name of the model and the model you created(your schema)
let todo = mongoose.model("todo", todoSchema);
// User.createIndexes()  now this dupication will be handled in route js 

module.exports = todo