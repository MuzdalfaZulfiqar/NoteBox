// require mongoose library
const mongoose = require("mongoose");

// get this URI from your compass
// writing it like /iNotebook will create a newdatabase
const mongoURI = "mongodb+srv://muzdalfazulfiqar11:XkvbRCMmdSAgoU6C@cluster1.xgaug.mongodb.net/iNotebook";

// create a function (lets say arrow function in this case) within this use you moonge to connect to URI you got from compass and a second parameter of call back function
function connectToMongo(){
    // .connect gives us promise
    // can also be written in form of the async await
    mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
        

// use this statement to export you mongofunction you created and this will be called within the index.js file
module.exports = connectToMongo;