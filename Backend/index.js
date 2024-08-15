// kind of imported our db file mainly the method for connection we made there
const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')

const app = express()
const port = 3001

app.use(cors())

// calling the method here and executing the function
connectToMongo();

const userRoute  = require("./routes/User")
const notesRoute  = require("./routes/Notes")
const todoRoute  = require("./routes/Todo")
// check whatis this


// When a GET request is made to the root URL, the server responds with the text "Hello World!" 
//  app.get('/', (req, res) => {
//  res.send('Hello World!')
//  })

// app.get('/profile/:username', (req,res)=>{
//   res.send(`Hi ${req.params.username}`)
// })

app.use(express.json())

app.use("/api/auth", userRoute)
app.use("/api/notes", notesRoute)
app.use("/api/todo", todoRoute)


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})